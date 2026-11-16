"""Track an AI-cleaned background plate onto the original drone footage.
Requires opencv-python-headless + numpy; does not regenerate gameplay pixels.
"""
import argparse,json,subprocess
from pathlib import Path
import cv2,numpy as np
p=argparse.ArgumentParser();p.add_argument('--source',required=True);p.add_argument('--plate',required=True);p.add_argument('--output',required=True);p.add_argument('--work',required=True);a=p.parse_args()
work=Path(a.work);work.mkdir(parents=True,exist_ok=True)
cv2.setNumThreads(4)
cap=cv2.VideoCapture(a.source);fps=cap.get(cv2.CAP_PROP_FPS);duration=cap.get(cv2.CAP_PROP_FRAME_COUNT)/fps
W,H=1600,900
sift=cv2.SIFT_create(nfeatures=6500,contrastThreshold=.012)
def read(sec):
 cap.set(cv2.CAP_PROP_POS_MSEC,sec*1000);ok,f=cap.read()
 if not ok:raise RuntimeError(f'Cannot read {sec}')
 return f
roi=np.zeros((H,W),np.uint8);roi[100:880,405:1580]=255
def features(f):return sift.detectAndCompute(cv2.cvtColor(f,cv2.COLOR_BGR2GRAY),roi)
def register(k1,d1,k2,d2):
 good=[m for m,n in cv2.BFMatcher().knnMatch(d1,d2,k=2) if m.distance<.7*n.distance]
 if len(good)<12:raise RuntimeError(f'Insufficient matches: {len(good)}')
 mat,ins=cv2.findHomography(np.float32([k1[m.queryIdx].pt for m in good]),np.float32([k2[m.trainIdx].pt for m in good]),cv2.RANSAC,2.5)
 n=int(ins.sum())
 if n<15:raise RuntimeError(f'Insufficient inliers: {n}')
 return mat,n
ref=read(10);kr,dr=features(ref)
plate=cv2.resize(cv2.imread(a.plate),(W,H));kp,dp=features(plate)
plateH,n=register(kp,dp,kr,dr);plate=cv2.warpPerspective(plate,plateH,(W,H))
mask=np.zeros((H,W),np.uint8)
polys=[[(755,190),(1360,270),(1308,418),(778,332)],[(420,690),(515,432),(741,166),(797,205),(785,327),(715,430),(655,530),(614,676)],[(1000,799),(1208,810),(1214,856),(998,850)]]
for poly in polys:cv2.fillPoly(mask,[np.array(poly,np.int32)],255)
mask=cv2.GaussianBlur(mask,(25,25),6)
anchors={10:(kr,dr,np.eye(3))}
for sec,parent in [(5,10),(0,5),(12,10),(14,12),(15.5,14)]:
 k,d=features(read(sec));mat,n=register(anchors[parent][0],anchors[parent][1],k,d)
 anchors[sec]=(k,d,mat@anchors[parent][2]);print('anchor',sec,n,flush=True)
corners=np.float32([[400,100],[1590,100],[1590,890],[400,890]]).reshape(-1,1,2)
outfps=30;N=int(duration*outfps);step=3;sample_ids=sorted(set(list(range(0,N,step))+[N-1]));positions=[];stats=[]
for i in sample_ids:
 sec=i/outfps;key=min(anchors,key=lambda t:abs(t-sec));ka,da,anchorH=anchors[key];k,d=features(read(sec));mat,n=register(ka,da,k,d);mat=mat@anchorH
 positions.append(cv2.perspectiveTransform(corners,mat).reshape(4,2));stats.append({'frame':i,'inliers':n,'anchor':key})
print('tracked',len(sample_ids),'keyframes; min inliers',min(s['inliers'] for s in stats),flush=True)
positions=np.array(positions);np.savez(work/'tracking.npz',samples=sample_ids,positions=positions)
(work/'tracking.json').write_text(json.dumps(stats))
# Interpolate tracked corner positions, rather than homography coefficients.
interp=np.empty((N,4,2))
for c in range(4):
 for axis in range(2):interp[:,c,axis]=np.interp(np.arange(N),sample_ids,positions[:,c,axis])
proc=subprocess.Popen(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r',str(outfps),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',a.output],stdin=subprocess.PIPE)
for i in range(N):
 f=read(i/outfps);mat=cv2.getPerspectiveTransform(corners.reshape(4,2),interp[i].astype(np.float32))
 patch=cv2.warpPerspective(plate,mat,(W,H));alpha=cv2.warpPerspective(mask,mat,(W,H)).astype(np.float32)/255
 # Preserve the source's original landscape matte; no paint may spill into it.
 alpha[:,:400]=0
 alpha[f.max(axis=2)<3]=0
 alpha=alpha[:,:,None]
 out=np.clip(patch*alpha+f*(1-alpha),0,255).astype(np.uint8)
 proc.stdin.write(out.tobytes())
 if i%60==0:cv2.imwrite(str(work/f'frame-{i:04d}.jpg'),out);print('render',i,'/',N,flush=True)
proc.stdin.close();code=proc.wait();cap.release()
if code:raise RuntimeError('ffmpeg failed')
print('done',a.output,flush=True)
