let playerNames = [];
let casterName = "";
let playerCount = 0;
let turnOrder = [];
let currentTurn = 0;
let playerCards = {};
let currentScript = "";
let insertedScript = "";
let currentPlayerCards = [];
let blankAssignments = [];
let insertedWords = {};
let isManualCasterSelection = false;

const clickSound = new Audio('click.mp3');

const wordDeck = [
  "猫", "宇宙人", "ピザ", "ダンス", "爆発", "突然", "大声", "忍者", "ケーキ", "歌う",
  "犬", "ロボット", "魔法", "笑顔", "ジャンプ", "静かに", "ハグ", "ゾンビ", "雨", "走る",
  "怪獣", "お金", "テレビ", "学校", "飛行機", "秘密", "パンダ", "カレー", "夢", "太陽",
  "月", "星", "風", "雷", "雪", "花", "木", "川", "山", "海", "砂漠", "島", "橋", "道",
  "ジョン", "エマ", "アレックス", "ソフィア", "マイケル",
  "太郎", "花子", "健太", "美咲", "翔太",
  "変態", "狂人", "奇人", "マニア", "オタク",
  "ムキムキ", "ヤンキー", "いけにえ", "臭み", "レシート", "めんつゆ", "カツラ", "汗だく", "涙目", "ドヤ顔",
  "ハゲ", "オナラ", "ブス", "バカ", "デブ", "ガリガリ", "チビ", "巨人", "マッチョ", "引きこもり",
  "ズボン", "パンツ", "帽子", "ゴミ箱", "トイレ", "ウーパールーパー", "ムスカ", "ミス", "ゴリラ", "スイッチ",
  "歯茎", "口臭", "タバコ", "酒癖", "酔っ払い", "寝癖", "オレオレ", "ドジっ子", "ツンデレ", "ヤンデレ",
  "ギャル", "オッサン", "おばちゃん", "赤ちゃん", "おじいちゃん", "おばあちゃん", "幽霊", "ゾンビ", "吸血鬼", "人魚",
  "サンタ", "トナカイ", "雪だるま", "カボチャ", "お化け", "ピエロ", "忍者", "侍", "将軍", "大名",
  "海賊", "船長", "宇宙人", "ロボ", "サイボーグ", "怪獣", "魔法使い", "勇者", "魔王", "天使",
  "悪魔", "神様", "仏様", "和尚", "尼さん", "アイドル", "芸人", "漫才", "コント", "モノマネ",
  "カラオケ", "ラッパー", "DJ", "バンドマン", "ギタリスト", "ドラマー", "ボーカル", "ダンサー", "バレリーナ", "相撲取り",
  "力士", "プロレスラー", "ボクサー", "空手家", "柔道家", "剣道家", "忍者", "スパイ", "探偵", "泥棒",
  "コーヒー", "紅茶", "ジュース", "ビール", "ワイン", "寿司", "ラーメン", "ハンバーガー", "唐揚げ", "天ぷら",
  "パソコン", "スマホ", "タブレット", "カメラ", "時計", "電車", "バス", "車", "自転車", "船",
  "地震", "台風", "洪水", "火事", "雷鳴", "警察", "消防士", "医者", "看護師", "教師",
  "生徒", "社長", "社員", "アルバイト", "主婦", "朝", "昼", "夜", "夕方", "深夜",
  "春", "夏", "秋", "冬", "誕生日", "お正月", "クリスマス", "ハロウィン", "バレンタイン", "花見",
  "旅行", "キャンプ", "釣り", "登山", "スキー", "映画", "ドラマ", "アニメ", "ゲーム", "漫画",
  "本", "新聞", "雑誌", "ラジオ", "音楽", "絵", "写真", "料理", "掃除", "洗濯",
  "犬派", "猫派", "鳥", "魚", "虫", "ライオン", "トラ", "ゾウ", "キリン", "パンダ",
  "カエル", "ヘビ", "クマ", "ウサギ", "ネズミ", "王子", "お姫様", "騎士", "魔法少女", "怪盗",
  "ヒーロー", "悪役", "科学者", "発明家", "冒険家", "探検家", "画家", "作家", "詩人", "写真家",
  "トラック", "バイク", "ヘリコプター", "ロケット", "潜水艦", "戦車", "剣", "盾", "弓", "矢",
  "鎧", "兜", "王様", "女王", "貴族", "農民", "商人", "職人", "鍛冶屋", "パン屋",
  "肉", "魚料理", "野菜", "果物", "お菓子", "アイス", "チョコ", "クッキー", "ドーナツ", "プリン",
  "温泉", "プール", "海水浴", "サーフィン", "ダイビング", "スケート", "サッカー", "野球", "バスケ", "テニス",
  "ゴルフ", "ラグビー", "卓球", "バレー", "ホッケー", "クリケット", "マラソン", "競馬", "競輪", "ボート",
  "風船", "凧", "オモチャ", "人形", "ブロック", "パズル", "トランプ", "将棋", "囲碁", "麻雀",
  "お城", "神社", "お寺", "教会", "モスク", "塔", "ビル", "工場", "農場", "牧場",
  "畑", "森", "湖", "滝", "火山", "洞窟", "遺跡", "博物館", "図書館", "公園",
  "遊園地", "動物園", "水族館", "映画館", "劇場", "コンサート", "フェス", "市場", "店", "銀行",
  "郵便局", "病院", "薬局", "美容院", "床屋", "カフェ", "レストラン", "バー", "ホテル", "旅館",
  "駅", "空港", "港", "高速道路", "橋", "トンネル", "信号", "電柱", "電線", "ダム",
  "電池", "電球", "扇風機", "エアコン", "冷蔵庫", "洗濯機", "掃除機", "電子レンジ", "オーブン", "テレビ",
  "ランプ", "鏡", "椅子", "机", "ベッド", "ソファ", "棚", "カーテン", "絨毯", "時計",
  "傘", "靴", "帽子", "服", "ネクタイ", "ベルト", "バッグ", "財布", "指輪", "ネックレス",
  "メガネ", "サングラス", "マスク", "手袋", "マフラー", "タオル", "ハンカチ", "歯ブラシ", "シャンプー", "石鹸",
  "ペン", "ノート", "消しゴム", "定規", "ハサミ", "テープ", "ホッチキス", "ファイル", "カレンダー", "地図",
  "メール", "電話", "ビデオ", "チャット", "インターネット", "アプリ", "ソフト", "データ", "サーバー", "クラウド",
  "鍵", "錠前", "ドア", "窓", "屋根", "壁", "床", "階段", "エレベーター", "エスカレーター"
];

const scriptTemplates = [
  "今日のニュースです。\n[1]が[2]で[3]したところ、\n[4]が突然[5]に現れ、\n[6]を始めました。\n市民は[7]と驚き、\n[8]が[9]に駆けつけ、\n[10]が発生。\nさらに[11]が[12]で[13]し、\n[14]が[15]と反応しました。",
  "昨日、\n[1]が[2]に行き、\nそこで[3]したことが話題に。\nすると[4]が[5]で乱入し、\n[6]を叫びました。\n目撃者は[7]と証言し、\n[8]が[9]に登場。\n住民は[10]と騒ぎ、\n[11]が[12]に発展し、\n[13]が[14]を始め、\n[15]が混乱中です。",
  "今朝、\n[1]が[2]に現れ、\n[3]を始めました。\nそこに[4]が[5]で反撃し、\n[6]が巻き込まれ、\n[7]が発生。\n関係者は[8]とコメントし、\n[9]が[10]に駆けつけ、\n[11]が[12]に発展。\n市民は[13]と驚き、\n[14]が[15]と予測しています。",
  "地域ニュースです。\n[1]が[2]で[3]を行い、\n[4]が[5]に登場。\n住民は[6]と反応し、\n[7]が[8]を呼び、\n[9]が発生。\nすると[10]が[11]で[12]し、\n[13]が[14]に波及し、\n[15]が注目を集めました。",
  "速報です。\n[1]が[2]で[3]した結果、\n[4]が[5]に突入し、\n[6]が[7]で反応。\nそこに[8]が[9]で乱入し、\n[10]が[11]を叫びました。\n市民は[12]と騒ぎ、\n[13]が[14]に発展し、\n[15]が混乱しています。",
  "海外からのニュースです。\n[1]が[2]で[3]した後、\n[4]が[5]に現れ、\n[6]を始めました。\n国際社会は[7]と反応し、\n[8]が[9]に駆けつけ、\n[10]が発生。\nさらに[11]が[12]で[13]し、\n[14]が[15]に波及しました。",
  "今週の特集です。\n[1]が[2]に挑戦し、\n[3]を達成。\nそこに[4]が[5]で乱入し、\n[6]が[7]に発展。\n視聴者は[8]と驚き、\n[9]が[10]を叫び、\n[11]が[12]に登場。\n結果、[13]が[14]と評価され、\n[15]が話題になっています。",
  "衝撃のニュースです。\n[1]が[2]で[3]したところ、\n[4]が[5]に現れ、\n[6]を始めました。\n市民は[7]と驚き、\n[8]が[9]に駆けつけ、\n[10]が発生。\nさらに[11]が[12]で[13]し、\n[14]が[15]と反応。\n関係者は[16]とコメントし、\n[17]が注目され、\n[18]が混乱中です。",
  "昨日、\n[1]が[2]で[3]したことが話題に。\nそこに[4]が[5]で乱入し、\n[6]を叫びました。\n目撃者は[7]と証言し、\n[8]が[9]に登場。\n住民は[10]と騒ぎ、\n[11]が[12]に発展。\nさらに[13]が[14]で[15]し、\n[16]が[17]に波及し、\n[18]が混乱しています。",
  "今朝の事件です。\n[1]が[2]に現れ、\n[3]を始めました。\nすると[4]が[5]で反撃し、\n[6]が巻き込まれ、\n[7]が発生。\n関係者は[8]とコメントし、\n[9]が[10]に駆けつけ、\n[11]が[12]に発展。\n市民は[13]と驚き、\n[14]が[15]で[16]し、\n[17]が[18]と予測しています。",
  "地域で大騒ぎです。\n[1]が[2]で[3]した後、\n[4]が[5]に登場。\n住民は[6]と反応し、\n[7]が[8]を呼び、\n[9]が発生。\nすると[10]が[11]で[12]し、\n[13]が[14]に波及。\nさらに[15]が[16]で[17]し、\n[18]が注目を集めました。",
  "海外からの速報です。\n[1]が[2]で[3]した結果、\n[4]が[5]に突入し、\n[6]が[7]で反応。\nそこに[8]が[9]で乱入し、\n[10]が[11]を叫びました。\n国際社会は[12]と反応し、\n[13]が[14]に駆けつけ、\n[15]が[16]に発展し、\n[17]が[18]に波及しています。",
  "特集です。\n[1]が[2]に挑戦し、\n[3]を達成。\nそこに[4]が[5]で乱入し、\n[6]が[7]に発展。\n視聴者は[8]と驚き、\n[9]が[10]を叫び、\n[11]が[12]に登場。\n結果、[13]が[14]と評価され、\n[15]が[16]で[17]し、\n[18]が話題になっています。",
  "驚きのニュースです。\n[1]が[2]で[3]したところ、\n[4]が[5]に登場し、\n[6]を叫びました。\n住民は[7]と反応し、\n[8]が[9]に駆けつけ、\n[10]が発生。\nさらに[11]が[12]で[13]し、\n[14]が[15]に波及。\n関係者は[16]とコメントし、\n[17]が[18]と予測しています。",
  "今週の話題です。\n[1]が[2]で[3]を始め、\n[4]が[5]で応戦。\nそこに[6]が[7]で参戦し、\n[8]が発生。\n関係者は[9]とコメントし、\n[10]が[11]に駆けつけ、\n[12]が[13]に発展。\n市民は[14]と驚き、\n[15]が[16]で[17]し、\n[18]が注目されています。",
  "緊急速報です。\n[1]が[2]に現れ、\n[3]した後、\n[4]が[5]で反応。\n市民は[6]と騒ぎ、\n[7]が[8]に突入し、\n[9]が[10]に発展。\nさらに[11]が[12]で[13]し、\n[14]が[15]に登場。\n関係者は[16]とコメントし、\n[17]が[18]と予測しています。",
  "奇妙な事件です。\n[1]が[2]で[3]した結果、\n[4]が[5]に登場。\nそこに[6]が[7]で乱入し、\n[8]が[9]に波及。\n市民は[10]と驚き、\n[11]が[12]に駆けつけ、\n[13]が発生。\nさらに[14]が[15]で[16]し、\n[17]が[18]と反応しました。"
];

function adjustScriptForPlayers(script, playerCount) {
  const maxBlanks = script.match(/\[\d+\]/g)?.length || 0;
  let adjustedScript = script;
  let assignments = [];

  if (maxBlanks < playerCount) {
    for (let i = maxBlanks + 1; i <= playerCount; i++) {
      adjustedScript += `\nまた、[${i}]も注目されています。`;
    }
    assignments = Array(playerCount).fill().map((_, i) => [i + 1]);
  } else {
    const basePerPlayer = Math.floor(maxBlanks / playerCount);
    const remainder = maxBlanks % playerCount;
    assignments = Array(playerCount).fill().map(() => []);
    let pos = 1;

    for (let round = 0; round < basePerPlayer; round++) {
      for (let i = 0; i < playerCount; i++) {
        assignments[i].push(pos++);
      }
    }

    for (let i = 0; i < remainder; i++) {
      let targetPlayer = i % playerCount;
      if (assignments[targetPlayer].includes(pos - 1)) {
        targetPlayer = (targetPlayer + 1) % playerCount;
      }
      assignments[targetPlayer].push(pos++);
    }
  }

  return { script: adjustedScript, assignments };
}

function goToNameInput() {
  playerCount = parseInt(document.getElementById("playerCount").value);
  if (isNaN(playerCount) || playerCount < 2 || playerCount > 6) {
    alert("2〜6人で入力してください");
    return;
  }

  const container = document.getElementById("nameFields");
  container.innerHTML = '';
  for (let i = 0; i < playerCount; i++) {
    const inputDiv = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `プレイヤー${i + 1}の名前`;
    input.required = true;
    inputDiv.appendChild(input);

    const checkboxLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `casterCheckbox${i}`;
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(" ニュースキャスターに選択"));
    inputDiv.appendChild(checkboxLabel);

    container.appendChild(inputDiv);
  }

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("nameInput").classList.remove("hidden");
}

function proceedFromNameInput() {
  const inputs = document.querySelectorAll("#nameFields input[type='text']");
  playerNames = Array.from(inputs).map(input => input.value.trim());

  if (playerNames.some(name => name === "")) {
    alert("全員の名前を入力してください！");
    return;
  }

  const checkboxes = document.querySelectorAll("#nameFields input[type='checkbox']");
  isManualCasterSelection = Array.from(checkboxes).some(cb => cb.checked);

  document.getElementById("nameInput").classList.add("hidden");
  if (isManualCasterSelection) {
    showManualCasterSelection();
  } else {
    startRoulette();
  }
}

function showManualCasterSelection() {
  document.getElementById("casterSelectionScreen").classList.remove("hidden");
  const casterSelect = document.getElementById("casterSelect");
  casterSelect.innerHTML = '<option value="">ニュースキャスターを選択</option>';
  playerNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    casterSelect.appendChild(option);
  });
}

function confirmCasterSelection() {
  casterName = document.getElementById("casterSelect").value;
  if (!casterName) {
    alert("ニュースキャスターを選んでください！");
    return;
  }
  document.getElementById("casterSelectionScreen").classList.add("hidden");
  startTurnOrder();
}

function startRoulette() {
  document.getElementById("rouletteScreen").classList.remove("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  let index = 0;
  let intervalSpeed = 100;
  const rouletteText = document.getElementById("rouletteText");

  let spinInterval = setInterval(() => {
    rouletteText.textContent = playerNames[index];
    index = (index + 1) % playerNames.length;
  }, intervalSpeed);

  document.getElementById("stopBtn").onclick = () => {
    clearInterval(spinInterval);
    let slowSpeed = intervalSpeed;

    const slowDown = () => {
      slowSpeed += 100;
      spinInterval = setInterval(() => {
        rouletteText.textContent = playerNames[index];
        index = (index + 1) % playerNames.length;
      }, slowSpeed);

      if (slowSpeed >= 600) {
        clearInterval(spinInterval);
        casterName = playerNames[index];
        rouletteText.textContent = `🎤 ニュースキャスターは「${casterName}」です！`;
        document.getElementById("stopBtn").classList.add("hidden");
        document.getElementById("startBtn").classList.remove("hidden");
      } else {
        setTimeout(() => {
          clearInterval(spinInterval);
          slowDown();
        }, 1000);
      }
    };

    slowDown();
  };
}

function startTurnOrder() {
  document.getElementById("rouletteScreen").classList.add("hidden");
  document.getElementById("casterSelectionScreen").classList.add("hidden");
  document.getElementById("turnScreen").classList.remove("hidden");
  turnOrder = playerNames.filter(name => name !== casterName);
  document.getElementById("turnOrder").textContent = "順番: " + turnOrder.join(" → ");
}

function dealCards() {
  document.getElementById("turnScreen").classList.add("hidden");
  document.getElementById("cardScreen").classList.remove("hidden");
  currentTurn = 0;
  playerCards = {};
  
  let availableCards = [...wordDeck];
  turnOrder.forEach(player => {
    playerCards[player] = [];
    for (let i = 0; i < 12; i++) {
      if (availableCards.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[randomIndex];
      playerCards[player].push(card);
      availableCards.splice(randomIndex, 1);
    }
  });
  showPlayerCards();
}

function showPlayerCards() {
  const cardsDiv = document.getElementById("playerCards");
  cardsDiv.innerHTML = `${turnOrder[currentTurn]}のカード: `;
  playerCards[turnOrder[currentTurn]].forEach(card => {
    const btn = document.createElement("div");
    btn.className = "card-button";
    btn.textContent = card;
    cardsDiv.appendChild(btn);
  });
}

function nextPlayerTurn() {
  currentTurn++;
  if (currentTurn < turnOrder.length) {
    showPlayerCards();
  } else {
    document.getElementById("nextTurnBtn").classList.add("hidden");
    document.getElementById("showScriptBtn").classList.remove("hidden");
  }
}

function showScript() {
  document.getElementById("cardScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  const baseScript = scriptTemplates[Math.floor(Math.random() * scriptTemplates.length)];
  const adjusted = adjustScriptForPlayers(baseScript, turnOrder.length);
  currentScript = adjusted.script;
  insertedScript = adjusted.script;
  blankAssignments = adjusted.assignments;
  insertedWords = {};

  let displayScript = currentScript;
  blankAssignments.forEach((assignment, index) => {
    const playerName = turnOrder[index];
    assignment.forEach(num => {
      displayScript = displayScript.replace(`[${num}]`, `<span class="blank-placeholder">${playerName}</span>`);
    });
  });
  document.getElementById("scriptText").innerHTML = displayScript;
}

function startInsertPhase() {
  document.body.classList.add("news-background");
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("insertScreen").classList.remove("hidden");
  currentTurn = 0;
  showInsertPhase();
}

function showInsertPhase() {
  const insertCards = document.getElementById("insertCards");
  const insertScript = document.getElementById("insertScript");
  insertCards.innerHTML = "";
  currentPlayerCards = [...playerCards[turnOrder[currentTurn]]];
  currentPlayerCards.forEach(card => {
    const btn = document.createElement("div");
    btn.className = "card-button";
    btn.textContent = card;
    btn.draggable = true;

    btn.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", card);
    });

    btn.addEventListener("touchstart", e => {
      e.preventDefault();
      btn.dataset.dragging = card;
    });
    btn.addEventListener("touchmove", e => {
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("drop-zone")) {
        target.classList.add("dragover");
      }
    });
    btn.addEventListener("touchend", e => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("drop-zone")) {
        handleDrop(target, btn.dataset.dragging);
        target.classList.remove("dragover");
      }
      delete btn.dataset.dragging;
    });

    insertCards.appendChild(btn);
  });

  insertScript.innerHTML = "";
  const parts = currentScript.split(/(\[\d+\])/);
  parts.forEach(part => {
    const span = document.createElement("span");
    if (part.match(/^\[\d+\]$/)) {
      const pos = parseInt(part.match(/\d+/)[0]);
      const playerIndex = blankAssignments.findIndex(assignment => assignment.includes(pos));
      const playerName = playerIndex !== -1 ? turnOrder[playerIndex] : "不明";
      if (blankAssignments[currentTurn].includes(pos)) {
        span.className = "drop-zone";
        span.dataset.position = pos;
        span.dataset.original = playerName;
        span.textContent = playerName;

        span.addEventListener("dragover", e => e.preventDefault());
        span.addEventListener("dragenter", e => e.target.classList.add("dragover"));
        span.addEventListener("dragleave", e => e.target.classList.remove("dragover"));
        span.addEventListener("drop", e => {
          e.preventDefault();
          const card = e.dataTransfer.getData("text");
          handleDrop(e.target, card);
          e.target.classList.remove("dragover");
        });
      } else {
        span.textContent = playerName;
      }
    } else {
      span.textContent = part;
    }
    insertScript.appendChild(span);
  });

  insertCards.addEventListener("dragover", e => e.preventDefault());
  insertCards.addEventListener("drop", e => {
    const card = e.dataTransfer.getData("text");
    handleCardReturn(card);
  });

  insertCards.addEventListener("touchend", e => {
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.closest("#insertCards")) {
      const card = e.target.dataset.dragging;
      if (card) handleCardReturn(card);
    }
  });
}

function handleDrop(target, card) {
  const prevWord = insertedWords[target.dataset.position];
  target.textContent = card;
  target.classList.add("filled");
  target.draggable = true;

  target.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", target.textContent);
  });

  target.addEventListener("touchstart", e => {
    e.preventDefault();
    target.dataset.dragging = target.textContent;
  });
  target.addEventListener("touchmove", e => {
    e.preventDefault();
    const touch = e.touches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      dropTarget.classList.add("dragover");
    }
  });
  target.addEventListener("touchend", e => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      handleDrop(dropTarget, target.dataset.dragging);
      dropTarget.classList.remove("dragover");
    } else if (dropTarget && dropTarget.closest("#insertCards")) {
      handleCardReturn(target.dataset.dragging);
    }
    delete target.dataset.dragging;
  });

  insertedWords[target.dataset.position] = card;
  const cardIndex = currentPlayerCards.indexOf(card);
  if (cardIndex !== -1) currentPlayerCards.splice(cardIndex, 1);
  if (prevWord && prevWord !== card) {
    currentPlayerCards.push(prevWord);
  }
  updateCards();
}

function handleCardReturn(card) {
  const filledZones = document.querySelectorAll(".drop-zone.filled");
  filledZones.forEach(zone => {
    if (zone.textContent === card) {
      const pos = parseInt(zone.dataset.position);
      const playerName = zone.dataset.original;
      zone.textContent = playerName;
      zone.classList.remove("filled");
      delete insertedWords[pos];
      currentPlayerCards.push(card);
    }
  });
  updateCards();
}

function updateCards() {
  const insertCards = document.getElementById("insertCards");
  insertCards.innerHTML = "";
  currentPlayerCards.forEach(card => {
    const btn = document.createElement("div");
    btn.className = "card-button";
    btn.textContent = card;
    btn.draggable = true;

    btn.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", card);
    });

    btn.addEventListener("touchstart", e => {
      e.preventDefault();
      btn.dataset.dragging = card;
    });
    btn.addEventListener("touchmove", e => {
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("drop-zone")) {
        target.classList.add("dragover");
      }
    });
    btn.addEventListener("touchend", e => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("drop-zone")) {
        handleDrop(target, btn.dataset.dragging);
        target.classList.remove("dragover");
      }
      delete btn.dataset.dragging;
    });

    insertCards.appendChild(btn);
  });
}

function submitInsert() {
  currentTurn++;
  if (currentTurn < turnOrder.length) {
    showInsertPhase();
  } else {
    insertedScript = currentScript;
    for (const [pos, word] of Object.entries(insertedWords)) {
      insertedScript = insertedScript.replace(`[${pos}]`, word);
    }
    document.getElementById("insertScreen").classList.add("hidden");
    document.getElementById("waitingScreen").classList.remove("hidden");
    let displayScript = currentScript;
    blankAssignments.forEach((assignment, index) => {
      const playerName = turnOrder[index];
      assignment.forEach(num => {
        displayScript = displayScript.replace(`[${num}]`, `<span class="blank-placeholder">${playerName}</span>`);
      });
    });
    document.getElementById("waitingScript").innerHTML = displayScript;
  }
}

function showRevealPhase() {
  document.getElementById("waitingScreen").classList.add("hidden");
  document.getElementById("revealScreen").classList.remove("hidden");

  const revealScreen = document.getElementById("revealScreen");
  revealScreen.innerHTML = "";

  const scriptDiv = document.createElement("div");
  scriptDiv.id = "revealScript";

  const parts = currentScript.split(/(\[\d+\])/);
  parts.forEach((part, index) => {
    const span = document.createElement("span");
    if (part.match(/^\[\d+\]$/)) {
      const num = parseInt(part.match(/\d+/)[0]);
      const playerIndex = blankAssignments.findIndex(assignment => assignment.includes(num));
      const playerName = playerIndex !== -1 ? turnOrder[playerIndex] : "不明";
      const btn = document.createElement("button");
      btn.className = "blank-button";
      btn.textContent = playerName;
      btn.dataset.number = num;
      btn.dataset.isRevealed = "false";
      btn.onclick = () => {
        clickSound.play();
        toggleCard(num, btn);
      };
      span.appendChild(btn);
    } else {
      span.textContent = part;
    }
    scriptDiv.appendChild(span);
  });

  revealScreen.appendChild(scriptDiv);

  const nextBtn = document.createElement("button");
  nextBtn.id = "nextBtn";
  nextBtn.textContent = "次へ";
  nextBtn.onclick = () => {
    clickSound.play();
    showResultPhase();
  };
  nextBtn.classList.add("hidden");
  revealScreen.appendChild(nextBtn);

  window.revealedBlanks = new Set();
}

function toggleCard(num, btn) {
  const isRevealed = btn.dataset.isRevealed === "true";
  const word = insertedWords[num];
  const playerIndex = blankAssignments.findIndex(assignment => assignment.includes(num));
  const playerName = playerIndex !== -1 ? turnOrder[playerIndex] : "不明";

  if (!isRevealed) {
    if (word) {
      btn.textContent = word;
      btn.className = "card-revealed";
      btn.dataset.isRevealed = "true";
      window.revealedBlanks.add(num);
    } else {
      btn.textContent = "未挿入";
      btn.className = "card-revealed";
      btn.dataset.isRevealed = "true";
      window.revealedBlanks.add(num);
    }
  } else {
    btn.textContent = playerName;
    btn.className = "blank-button";
    btn.dataset.isRevealed = "false";
    window.revealedBlanks.delete(num);
  }

  const maxBlanks = currentScript.match(/\[\d+\]/g).length;
  const nextBtn = document.getElementById("nextBtn");
  if (window.revealedBlanks.size === maxBlanks) {
    nextBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.add("hidden");
  }
}

function showResultPhase() {
  document.getElementById("revealScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  const resultVotes = document.getElementById("resultVotes");
  resultVotes.innerHTML = `${casterName}が笑ったか判定してください:<br>`;
  turnOrder.forEach(player => {
    resultVotes.innerHTML += `
      ${player}: 
      <select id="vote-${player}">
        <option value="○">○</option>
        <option value="×">×</option>
      </select><br>
    `;
  });
  resultVotes.innerHTML += `<button onclick="calculateResult()">判定</button>`;
}

function calculateResult() {
  let yesCount = 0;
  let noCount = 0;
  turnOrder.forEach(player => {
    const vote = document.getElementById(`vote-${player}`).value;
    if (vote === "○") yesCount++;
    else noCount++;
  });
  const resultMessage = document.createElement("div");
  resultMessage.id = "resultMessage";
  resultMessage.textContent = yesCount > noCount ? "合格" : "不合格";
  const resultVotes = document.getElementById("resultVotes");
  resultVotes.appendChild(resultMessage);

  const endBtn = document.createElement("button");
  endBtn.textContent = "ゲーム終了";
  endBtn.onclick = endGame;
  resultVotes.appendChild(endBtn);

  const replayBtn = document.createElement("button");
  replayBtn.textContent = "同じキャスターで再挑戦";
  replayBtn.onclick = replayGame;
  resultVotes.appendChild(replayBtn);
}

function endGame() {
  document.body.classList.remove("news-background");
  alert("ゲーム終了！お疲れ様でした！");
  location.reload();
}

function replayGame() {
  document.body.classList.remove("news-background");
  document.getElementById("resultScreen").classList.add("hidden");
  playerCards = {};
  currentScript = "";
  insertedScript = "";
  currentPlayerCards = [];
  blankAssignments = [];
  insertedWords = {};
  dealCards();
}

// オンラインボタンの処理（ロード画面なし）
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("onlineBtn").addEventListener("click", () => {
    window.location.href = "online.html";
  });
});

window.revealedBlanks = new Set();