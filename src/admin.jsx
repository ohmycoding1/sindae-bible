import { useState, useEffect } from "react";

const SCHEDULE=[
  "마태복음 1–4장","마태복음 5–8장","마태복음 9–12장","마태복음 13–16장",
  "마태복음 17–20장","마태복음 21–24장","마태복음 25–28장 · 마가복음 1장",
  "마가복음 2–5장","마가복음 6–9장","마가복음 10–13장",
  "마가복음 14–16장 · 누가복음 1장","누가복음 2–5장","누가복음 6–9장",
  "누가복음 10–13장","누가복음 14–17장","누가복음 18–21장",
  "누가복음 22–24장 · 요한복음 1장","요한복음 2–5장","요한복음 6–9장",
  "요한복음 10–13장","요한복음 14–17장","요한복음 18–21장 · 사도행전 1장",
  "사도행전 2–5장","사도행전 6–9장","사도행전 10–13장","사도행전 14–17장",
  "사도행전 18–21장","사도행전 22–25장","사도행전 26–28장 · 로마서 1–2장",
  "로마서 3–6장","로마서 7–10장","로마서 11–14장",
  "로마서 15–16장 · 고린도전서 1–2장","고린도전서 3–6장","고린도전서 7–10장",
  "고린도전서 11–14장","고린도전서 15–16장 · 고린도후서 1–2장",
  "고린도후서 3–6장","고린도후서 7–10장","고린도후서 11–13장 · 갈라디아서 1장",
  "갈라디아서 2–5장","갈라디아서 6장 · 에베소서 1–4장",
  "에베소서 5–6장 · 빌립보서 1–2장","빌립보서 3–4장 · 골로새서 1–2장",
  "골로새서 3–4장 · 데살로니가전서 1–2장",
  "데살로니가전서 3–5장 · 데살로니가후서 1장",
  "데살로니가후서 2–3장 · 디모데전서 1–2장","디모데전서 3–6장","디모데후서 1–4장",
  "디도서 1–3장 · 빌레몬서 1장 · 히브리서 1–2장","히브리서 3–6장","히브리서 7–10장",
  "히브리서 11–13장 · 야고보서 1–2장","야고보서 3–5장 · 베드로전서 1–2장",
  "베드로전서 3–5장 · 베드로후서 1장","베드로후서 2–3장 · 요한일서 1–2장",
  "요한일서 3–5장","요한이서 1장 · 요한삼서 1장 · 유다서 1장",
  "요한계시록 1–4장","요한계시록 5–8장","요한계시록 9–12장",
  "요한계시록 13–16장","요한계시록 17–22장",
];

const FB_CONFIG={
  apiKey:"AIzaSyAu9mA5u7BcIqzAiugsYvC5dTImwctihN4",
  databaseURL:"https://sindae-bible-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"sindae-bible",
  appId:"1:435330757852:web:a9bd689a703d9146887019",
};

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Serif+KR:wght@300;400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#faf7f2;--s1:#ffffff;--s2:#fef4e4;--s3:#fde9cc;
  --gold:#a0600a;--gold2:#c07010;--gold3:#e09030;--golddim:#c8902a;
  --cream:#2c1a06;--cream2:#5a3a10;--cream3:#8a6030;
  --grn:#2d5a3c;--grn2:#3d7a50;--grn3:#e8f5ee;
  --sun:#8a5c00;--sun2:#e09000;--sun3:#fff8e6;
  --border:rgba(160,96,10,0.18);--borderl:rgba(160,96,10,0.4);
}
html,body{background:var(--bg);font-family:'Noto Serif KR',serif;color:var(--cream);}
.wrap{max-width:960px;margin:0 auto;padding:0 20px 60px;}
.hdr{background:linear-gradient(135deg,#1a0e04,#2d1a08);border-bottom:3px solid var(--gold2);padding:24px 28px;margin-bottom:28px;}
.hdr-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.hdr-church{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.3em;color:#e8a030;text-transform:uppercase;margin-bottom:4px;}
.hdr-title{font-size:22px;font-weight:700;color:#f2ddb8;}
.hdr-sub{font-size:12px;color:#b89a70;margin-top:4px;}
.refresh-btn{padding:8px 16px;background:rgba(200,128,26,0.15);border:1px solid rgba(200,128,26,0.4);border-radius:8px;color:#e8a030;font-size:12px;cursor:pointer;font-family:'Noto Serif KR',serif;transition:all 0.2s;display:flex;align-items:center;gap:6px;}
.refresh-btn:hover{background:rgba(200,128,26,0.28);}
.spinning{animation:spin 0.8s linear;}
.last-upd{font-size:11px;color:#b89a70;}
.hdr-right{display:flex;align-items:center;gap:10px;}

.stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px;}
.stat-card{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 20px;box-shadow:0 2px 10px rgba(0,0,0,0.04);}
.stat-icon{font-size:22px;margin-bottom:8px;}
.stat-val{font-size:28px;font-weight:700;color:var(--gold2);font-family:'Cinzel',serif;}
.stat-lbl{font-size:11px;color:var(--cream3);margin-top:4px;}
.stat-sub{font-size:11px;color:var(--cream3);margin-top:2px;}

.overall-card{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:20px 22px;margin-bottom:24px;box-shadow:0 2px 10px rgba(0,0,0,0.04);}
.sec-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.2em;color:var(--golddim);text-transform:uppercase;margin-bottom:14px;}
.pbar-bg{background:var(--s2);border-radius:100px;height:10px;border:1px solid var(--border);overflow:hidden;margin-bottom:6px;}
.pbar-fill{height:100%;background:linear-gradient(90deg,var(--golddim),var(--gold2),var(--gold3));border-radius:100px;transition:width 0.8s ease;}
.pbar-nums{display:flex;justify-content:space-between;font-size:11px;color:var(--cream3);}

.teams-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;}
@media(max-width:620px){.teams-grid{grid-template-columns:1fr;}}
.team-card{background:var(--s1);border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.04);}
.team-hdr{padding:13px 18px;display:flex;align-items:center;gap:10px;}
.team-hdr.thu{background:rgba(45,90,60,0.08);border-bottom:2px solid rgba(45,90,60,0.18);}
.team-hdr.sun{background:rgba(200,144,26,0.08);border-bottom:2px solid rgba(200,144,26,0.18);}
.team-icon{font-size:20px;}
.team-name{font-size:15px;font-weight:700;}
.team-name.thu{color:var(--grn);}
.team-name.sun{color:var(--sun);}
.team-meta{font-size:11px;color:var(--cream3);margin-left:auto;}
.team-avg{font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;margin-left:6px;}
.team-avg.thu{background:var(--grn3);color:var(--grn);}
.team-avg.sun{background:var(--sun3);color:var(--sun);}

.member-row{padding:11px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}
.member-row:last-child{border-bottom:none;}
.member-row:hover{background:var(--s2);}
.rank{font-size:11px;color:var(--cream3);font-family:'Cinzel',serif;width:18px;text-align:center;flex-shrink:0;}
.rank.top{color:var(--gold2);font-weight:700;}
.avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;}
.avatar.thu{background:rgba(45,90,60,0.15);color:var(--grn);border:1.5px solid rgba(45,90,60,0.3);}
.avatar.sun{background:rgba(200,144,26,0.15);color:var(--sun);border:1.5px solid rgba(200,144,26,0.3);}
.minfo{flex:1;min-width:0;}
.mname-row{display:flex;align-items:center;gap:6px;margin-bottom:3px;}
.mname{font-size:13px;font-weight:600;color:var(--cream);}
.done-tag{font-size:9px;padding:1px 6px;border-radius:100px;background:var(--grn3);color:var(--grn);border:1px solid rgba(45,90,60,0.25);}
.mpassage{font-size:10px;color:var(--cream3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mbar-wrap{display:flex;align-items:center;gap:7px;margin-top:5px;}
.mbar-bg{flex:1;background:var(--s2);border-radius:100px;height:4px;overflow:hidden;}
.mbar-thu{height:100%;background:linear-gradient(90deg,#2d5a3c,#5a9c6c);border-radius:100px;transition:width 0.6s;}
.mbar-sun{height:100%;background:linear-gradient(90deg,#8a5c00,#e09030);border-radius:100px;transition:width 0.6s;}
.mpct{font-size:10px;font-family:'Cinzel',serif;flex-shrink:0;}
.mpct.thu{color:var(--grn);}
.mpct.sun{color:var(--sun);}
.mdays{font-size:10px;color:var(--cream3);flex-shrink:0;}

.all-card{background:var(--s1);border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.04);}
.all-hdr{padding:13px 18px;background:var(--s2);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.filter-row{display:flex;gap:6px;}
.fbtn{padding:3px 11px;border-radius:100px;font-size:11px;border:1px solid var(--border);background:transparent;color:var(--cream3);cursor:pointer;font-family:'Noto Serif KR',serif;transition:all 0.15s;}
.fbtn.on{border-color:var(--gold2);color:var(--gold2);background:rgba(192,112,16,0.08);}
.fbtn.on-thu{border-color:var(--grn);color:var(--grn);background:var(--grn3);}
.fbtn.on-sun{border-color:var(--sun2);color:var(--sun);background:var(--sun3);}
.tbl-head{padding:9px 16px;background:var(--s3);display:grid;grid-template-columns:22px 36px 1fr 70px 56px 80px;gap:10px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.14em;color:var(--golddim);text-transform:uppercase;}
.tbl-row{padding:10px 16px;border-bottom:1px solid var(--border);display:grid;grid-template-columns:22px 36px 1fr 70px 56px 80px;align-items:center;gap:10px;transition:background 0.15s;}
.tbl-row:last-child{border-bottom:none;}
.tbl-row:hover{background:var(--s2);}
.t-badge{font-size:9px;padding:2px 6px;border-radius:5px;font-weight:600;text-align:center;}
.t-badge.thu{background:var(--grn3);color:var(--grn);}
.t-badge.sun{background:var(--sun3);color:var(--sun);}
.t-name{font-size:12px;color:var(--cream);font-weight:500;}
.t-passage{font-size:10px;color:var(--cream3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.t-days{font-size:12px;font-family:'Cinzel',serif;color:var(--cream);}
.t-pct{font-size:11px;font-family:'Cinzel',serif;}
.t-pct.thu{color:var(--grn);}
.t-pct.sun{color:var(--sun);}
.t-time{font-size:10px;color:var(--cream3);}

.loading{text-align:center;padding:60px;color:var(--cream3);font-size:13px;}
.empty{text-align:center;padding:32px;color:var(--cream3);font-size:13px;}

@keyframes spin{to{transform:rotate(360deg);}}
`;

function timeAgo(ts){
  if(!ts)return "-";
  const d=Date.now()-ts;
  if(d<60000)return "방금";
  if(d<3600000)return `${Math.floor(d/60000)}분 전`;
  if(d<86400000)return `${Math.floor(d/3600000)}시간 전`;
  return `${Math.floor(d/86400000)}일 전`;
}

export default function Admin(){
  const [members,setMembers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [lastUpdate,setLastUpdate]=useState(null);
  const [spinning,setSpinning]=useState(false);
  const [filter,setFilter]=useState("all");

  const loadData=async()=>{
    setSpinning(true);
    setLoading(members.length===0);
    try{
      const {initializeApp,getApps}=await import("firebase/app");
      const {getDatabase,ref,get}=await import("firebase/database");
      const fbApp=getApps().length?getApps()[0]:initializeApp(FB_CONFIG);
      const db=getDatabase(fbApp);
      const snap=await get(ref(db,"members"));
      if(snap.exists()){
        const data=snap.val();
        const list=Object.values(data).sort((a,b)=>b.completed.length-a.completed.length);
        setMembers(list);
      } else {
        setMembers([]);
      }
      setLastUpdate(Date.now());
    }catch(e){
      console.error("Firebase error:",e);
    }
    setLoading(false);
    setTimeout(()=>setSpinning(false),700);
  };

  useEffect(()=>{
    loadData();
    const interval=setInterval(loadData,30000); // 30초마다 자동 새로고침
    return()=>clearInterval(interval);
  },[]);

  const thuMembers=members.filter(m=>m.team==="thu");
  const sunMembers=members.filter(m=>m.team==="sun");
  const total=members.length;
  const avgDays=total>0?Math.round(members.reduce((s,m)=>s+m.completed.length,0)/total):0;
  const thuAvg=thuMembers.length>0?Math.round(thuMembers.reduce((s,m)=>s+m.completed.length,0)/thuMembers.length):0;
  const sunAvg=sunMembers.length>0?Math.round(sunMembers.reduce((s,m)=>s+m.completed.length,0)/sunMembers.length):0;
  const completedAll=members.filter(m=>m.completed.length>=63).length;
  const overallPct=total>0?Math.round(members.reduce((s,m)=>s+(m.completed.length/63),0)/total*100):0;
  const filtered=filter==="all"?members:members.filter(m=>m.team===filter);

  return(
    <>
      <style>{CSS}</style>

      <div className="hdr">
        <div className="hdr-inner">
          <div>
            <div className="hdr-church">Sindae Joongang Church · 관리자</div>
            <div className="hdr-title">📖 신약의 삶 읽기 현황</div>
            <div className="hdr-sub">공동체 말씀 통독 대시보드</div>
          </div>
          <div className="hdr-right">
            {lastUpdate&&<div className="last-upd">업데이트 {timeAgo(lastUpdate)} · 30초마다 자동갱신</div>}
            <button className={`refresh-btn${spinning?" spinning":""}`} onClick={loadData}>
              ↻ 새로고침
            </button>
          </div>
        </div>
      </div>

      <div className="wrap">
        {loading?(
          <div className="loading">
            <div style={{fontSize:32,animation:"spin 1s linear infinite",display:"inline-block"}}>✝</div>
            <div style={{marginTop:14}}>데이터를 불러오는 중입니다…</div>
          </div>
        ):(
          <>
            {/* 통계 카드 */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-val">{total}</div>
                <div className="stat-lbl">전체 참여자</div>
                <div className="stat-sub">목요 {thuMembers.length}명 · 주일 {sunMembers.length}명</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-val">{avgDays}<span style={{fontSize:14,color:"var(--cream3)"}}>일</span></div>
                <div className="stat-lbl">평균 완독 일수</div>
                <div className="stat-sub">63일 기준</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-val">{completedAll}</div>
                <div className="stat-lbl">전체 완독자</div>
                <div className="stat-sub">63일 모두 완료</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-val">{overallPct}<span style={{fontSize:14,color:"var(--cream3)"}}>%</span></div>
                <div className="stat-lbl">공동체 평균 진행률</div>
                <div className="stat-sub">전체 평균</div>
              </div>
            </div>

            {/* 전체 진행 바 */}
            <div className="overall-card">
              <div className="sec-title">공동체 전체 진행률</div>
              <div className="pbar-bg">
                <div className="pbar-fill" style={{width:`${overallPct}%`}}/>
              </div>
              <div className="pbar-nums">
                <span>0일</span>
                <span style={{color:"var(--gold2)",fontWeight:600}}>{overallPct}% 진행</span>
                <span>63일 완독</span>
              </div>
            </div>

            {/* 팀별 현황 */}
            <div className="teams-grid">
              {[
                {team:"thu",label:"목요팀",icon:"🌿",list:thuMembers,avg:thuAvg},
                {team:"sun",label:"주일팀",icon:"☀️",list:sunMembers,avg:sunAvg},
              ].map(({team,label,icon,list,avg})=>(
                <div key={team} className="team-card">
                  <div className={`team-hdr ${team}`}>
                    <span className="team-icon">{icon}</span>
                    <span className={`team-name ${team}`}>{label}</span>
                    <span className="team-meta">{list.length}명</span>
                    <span className={`team-avg ${team}`}>평균 {avg}일</span>
                  </div>
                  {list.length===0?(
                    <div className="empty">등록된 멤버가 없어요</div>
                  ):list.map((m,i)=>{
                    const pct=Math.round((m.completed.length/63)*100);
                    const curDay=Math.min(m.completed.length,62);
                    const isDone=m.completed.length>=63;
                    return(
                      <div key={m.name} className="member-row">
                        <div className={`rank${i<3?" top":""}`}>{i+1}</div>
                        <div className={`avatar ${team}`}>{m.name.slice(0,1)}</div>
                        <div className="minfo">
                          <div className="mname-row">
                            <span className="mname">{m.name}</span>
                            {isDone&&<span className="done-tag">완독!</span>}
                          </div>
                          <div className="mpassage">{SCHEDULE[curDay]||""}</div>
                          <div className="mbar-wrap">
                            <div className="mbar-bg">
                              <div className={`mbar-${team}`} style={{width:`${pct}%`}}/>
                            </div>
                            <span className={`mpct ${team}`}>{pct}%</span>
                          </div>
                        </div>
                        <div className="mdays">{m.completed.length}/63일</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* 전체 테이블 */}
            <div className="all-card">
              <div className="all-hdr">
                <div className="sec-title" style={{marginBottom:0}}>전체 멤버 현황</div>
                <div className="filter-row">
                  {[{id:"all",l:"전체"},{id:"thu",l:"목요"},{id:"sun",l:"주일"}].map(({id,l})=>(
                    <button key={id}
                      className={`fbtn${filter===id?(id==="thu"?" on-thu":id==="sun"?" on-sun":" on"):""}`}
                      onClick={()=>setFilter(id)}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="tbl-head">
                <div>#</div><div>팀</div><div>이름 / 현재 본문</div>
                <div>완독</div><div>진행률</div><div>마지막</div>
              </div>
              {filtered.length===0?(
                <div className="empty">해당하는 멤버가 없어요</div>
              ):filtered.map((m,i)=>{
                const pct=Math.round((m.completed.length/63)*100);
                const curDay=Math.min(m.completed.length,62);
                const isDone=m.completed.length>=63;
                return(
                  <div key={m.name} className="tbl-row">
                    <div style={{fontSize:11,color:"var(--cream3)",fontFamily:"'Cinzel',serif"}}>{i+1}</div>
                    <div><span className={`t-badge ${m.team}`}>{m.team==="thu"?"목요":"주일"}</span></div>
                    <div style={{minWidth:0}}>
                      <div className="t-name">{m.name}{isDone?" ✅":""}</div>
                      <div className="t-passage">{SCHEDULE[curDay]||""}</div>
                    </div>
                    <div className="t-days">{m.completed.length}/63</div>
                    <div className={`t-pct ${m.team}`}>{pct}%</div>
                    <div className="t-time">{timeAgo(m.updatedAt)}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
