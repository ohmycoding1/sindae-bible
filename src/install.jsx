import { useState } from "react";

const APP_URL = "https://ohmycoding1.github.io/sindae-bible/";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Serif+KR:wght@300;400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:#faf7f2;font-family:'Noto Serif KR',serif;color:#2c1a06;min-height:100vh;}
.wrap{max-width:480px;margin:0 auto;padding:0 20px 60px;}

/* 헤더 */
.hdr{background:linear-gradient(135deg,#1a0e04,#2d1a08);padding:36px 24px 32px;text-align:center;margin-bottom:32px;position:relative;overflow:hidden;}
.hdr::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(200,128,26,0.25),transparent 70%);}
.hdr-cross{font-size:56px;display:block;margin-bottom:16px;filter:drop-shadow(0 0 24px rgba(232,160,48,0.6));position:relative;}
.hdr-church{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.32em;color:#e8a030;text-transform:uppercase;margin-bottom:8px;position:relative;}
.hdr-title{font-size:28px;font-weight:700;color:#f2ddb8;letter-spacing:0.04em;position:relative;}
.hdr-sub{font-size:14px;color:#b89a70;margin-top:8px;position:relative;}

/* 설치 카드 */
.install-card{background:#fff;border:1px solid rgba(160,96,10,0.18);border-radius:20px;padding:24px 20px;margin-bottom:16px;box-shadow:0 2px 16px rgba(0,0,0,0.06);}
.card-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.22em;color:#c07010;font-weight:700;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.card-title-icon{font-size:18px;}

/* OS 탭 */
.os-tabs{display:flex;gap:8px;margin-bottom:20px;}
.os-tab{flex:1;padding:10px;border-radius:10px;border:2px solid rgba(160,96,10,0.18);background:transparent;cursor:pointer;font-size:14px;font-family:'Noto Serif KR',serif;font-weight:500;color:#8a6030;transition:all 0.2s;text-align:center;}
.os-tab.on{border-color:#c07010;background:rgba(192,112,16,0.06);color:#c07010;font-weight:700;}

/* 단계 */
.steps{display:flex;flex-direction:column;gap:14px;}
.step{display:flex;gap:14px;align-items:flex-start;}
.step-num{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#e8a030,#c07010);color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Cinzel',serif;}
.step-body{flex:1;padding-top:3px;}
.step-title{font-size:15px;font-weight:700;color:#2c1a06;margin-bottom:4px;}
.step-desc{font-size:13px;color:#8a6030;line-height:1.7;}
.step-highlight{display:inline-block;background:rgba(192,112,16,0.1);color:#a06008;border:1px solid rgba(192,112,16,0.25);border-radius:6px;padding:1px 8px;font-weight:600;font-size:13px;}
.step-img{margin-top:8px;background:#fef4e4;border:1px solid rgba(160,96,10,0.15);border-radius:10px;padding:12px 14px;font-size:20px;display:flex;align-items:center;gap:10px;}
.step-img-txt{font-size:13px;color:#5a3a10;line-height:1.6;}

/* 바로가기 버튼 */
.go-btn{display:block;width:100%;padding:16px;background:linear-gradient(135deg,#e8a030,#c07010,#9a5c0a);border:none;border-radius:14px;color:#fff;font-family:'Noto Serif KR',serif;font-size:17px;font-weight:700;cursor:pointer;text-align:center;text-decoration:none;box-shadow:0 4px 20px rgba(160,96,10,0.35);margin-bottom:12px;transition:all 0.2s;}
.go-btn:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(160,96,10,0.5);}

/* 공유 섹션 */
.share-section{background:#fff;border:1px solid rgba(160,96,10,0.18);border-radius:16px;padding:20px;text-align:center;margin-top:16px;}
.share-title{font-size:14px;font-weight:600;color:#5a3a10;margin-bottom:12px;}
.url-box{background:#fef4e4;border:1px solid rgba(160,96,10,0.2);border-radius:10px;padding:12px 14px;font-size:13px;color:#8a6030;word-break:break-all;margin-bottom:12px;user-select:all;}
.copy-btn{width:100%;padding:11px;background:#fef4e4;border:1px solid rgba(160,96,10,0.3);border-radius:10px;color:#a06008;font-size:14px;font-weight:600;cursor:pointer;font-family:'Noto Serif KR',serif;transition:all 0.15s;}
.copy-btn:hover{background:rgba(192,112,16,0.12);}
.copied{color:#3d7a50!important;border-color:#3d6b4c!important;}

/* 특징 */
.features{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.feat{background:#fff;border:1px solid rgba(160,96,10,0.15);border-radius:14px;padding:16px 14px;text-align:center;}
.feat-icon{font-size:26px;display:block;margin-bottom:8px;}
.feat-title{font-size:13px;font-weight:700;color:#2c1a06;margin-bottom:4px;}
.feat-desc{font-size:11px;color:#8a6030;line-height:1.6;}
`;

const STEPS = {
  ios: [
    {
      title: "Safari로 열기",
      desc: "카카오톡이나 다른 앱에서 링크를 받으셨다면, 반드시 Safari 브라우저로 열어주세요.",
      img: { icon: "🌐", text: "주소창에 링크 붙여넣기\n또는 하단 링크 버튼 탭" }
    },
    {
      title: "공유 버튼 탭",
      desc: "Safari 하단 가운데 공유 버튼을 탭하세요.",
      img: { icon: "⬆️", text: "화면 하단 가운데\n공유(네모+화살표) 버튼" }
    },
    {
      title: "'홈 화면에 추가' 선택",
      desc: "공유 메뉴를 아래로 스크롤하여 '홈 화면에 추가'를 선택하세요.",
      img: { icon: "➕", text: "홈 화면에 추가 탭" }
    },
    {
      title: "이름 확인 후 추가",
      desc: "'신약의 삶' 이름을 확인하고 우측 상단 '추가'를 탭하면 완료!",
      img: { icon: "✅", text: "우측 상단 '추가' 탭" }
    }
  ],
  android: [
    {
      title: "Chrome으로 열기",
      desc: "Chrome 브라우저로 아래 링크를 열어주세요.",
      img: { icon: "🌐", text: "Chrome 주소창에 링크 붙여넣기" }
    },
    {
      title: "메뉴 열기",
      desc: "Chrome 우측 상단의 점 세 개(⋮) 메뉴를 탭하세요.",
      img: { icon: "⋮", text: "우측 상단 ⋮ 버튼" }
    },
    {
      title: "'홈 화면에 추가' 선택",
      desc: "메뉴에서 '홈 화면에 추가' 또는 '앱 설치'를 선택하세요.",
      img: { icon: "📲", text: "'홈 화면에 추가' 탭" }
    },
    {
      title: "설치 완료",
      desc: "'설치' 또는 '추가'를 탭하면 홈 화면에 앱 아이콘이 생겨요!",
      img: { icon: "✅", text: "'설치' 탭 → 완료!" }
    }
  ]
};

export default function InstallGuide() {
  const [os, setOs] = useState(() =>
    /android/i.test(navigator.userAgent) ? "android" : "ios"
  );
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard?.writeText(APP_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="hdr">
        <span className="hdr-cross">✝</span>
        <div className="hdr-church">Sindae Joongang Church</div>
        <div className="hdr-title">신약의 삶</div>
        <div className="hdr-sub">63일 신약성경 통독 · 표준새번역</div>
      </div>

      <div className="wrap">
        {/* 특징 */}
        <div className="features">
          {[
            { icon:"📖", title:"표준새번역 전문", desc:"신약 7,957절 내장" },
            { icon:"🎙", title:"음성 읽기", desc:"장 단위 한국어 TTS" },
            { icon:"📅", title:"63일 일정표", desc:"목요팀 · 일요팀" },
            { icon:"📊", title:"진도 기록", desc:"완독 현황 저장" },
          ].map(f => (
            <div key={f.title} className="feat">
              <span className="feat-icon">{f.icon}</span>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* 바로 열기 */}
        <a className="go-btn" href={APP_URL}>
          📖 말씀 읽기 시작하기
        </a>

        {/* 설치 가이드 */}
        <div className="install-card">
          <div className="card-title">
            <span className="card-title-icon">📲</span>
            홈 화면에 앱으로 설치하기
          </div>

          {/* OS 탭 */}
          <div className="os-tabs">
            <button className={`os-tab${os==="ios"?" on":""}`} onClick={()=>setOs("ios")}>
              🍎 iPhone
            </button>
            <button className={`os-tab${os==="android"?" on":""}`} onClick={()=>setOs("android")}>
              🤖 Android
            </button>
          </div>

          {/* 단계 */}
          <div className="steps">
            {STEPS[os].map((s, i) => (
              <div key={i} className="step">
                <div className="step-num">{i+1}</div>
                <div className="step-body">
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                  <div className="step-img">
                    <span style={{fontSize:28,flexShrink:0}}>{s.img.icon}</span>
                    <div className="step-img-txt">{s.img.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 링크 공유 */}
        <div className="share-section">
          <div className="share-title">링크 복사해서 공유하기</div>
          <div className="url-box">{APP_URL}</div>
          <button className={`copy-btn${copied?" copied":""}`} onClick={copyUrl}>
            {copied ? "✓ 복사됐어요!" : "🔗 링크 복사"}
          </button>
        </div>
      </div>
    </>
  );
}
