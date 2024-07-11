let exampleList = [];
let textList = [];

class Hanzi {

    static list = [];
    static bushouListRAW = [
        "亻","讠","阝","刂","冖","冫","十","八","人","厂","力","卩","廴","勹","厶","匚","冂",
        "彳","女","氵","口","饣","忄","土","扌","子","纟","马","艹","宀","辶","囗","彡","广","夕","寸","大","小","门","巾","山","犭","尸","弓","丬","廾","尢","夂",
        "木","日","王","车","火","礻","攵","灬","心","方","手","止","户","曰","父","爫","月","犬",
        "目","钅","衤","疒","穴","立","田","石","矢","罒","皿","禾","白","鸟",
        "⺮","米","覀","页","舌","缶","耳","虫","虍","舟",
        "足","走","角","身",
        "鱼","隹","雨","齿",
        "革","骨","音"
    ];
    // static bushouList  = [
    // {nb:2,key:["亻","讠","阝","刂","冖","冫","十","八","人"," ","力","卩","廴","勹","厶","匚","冂"]},
    // {nb:3,key:["彳","女","氵","口","饣","忄","土","扌","子","纟","马","艹","宀","辶","囗","彡","广","夕","寸","大","小","门","巾","山","犭","尸","弓","丬","廾","尢","夂"]},
    // {nb:4,key:["木","日","王","车","火","礻","攵","灬","心","方","手","止","户","曰","父","爫","月"]},
    // {nb:5,key:["目","钅","衤","疒","穴","立","田","石","矢","罒","皿","禾","白","鸟"]},
    // {nb:6,key:["⺮","米","覀","页","舌","缶","耳","虫","虍","舟"]},
    // {nb:7,key:["足","走","角","身"]},
    // {nb:8,key:["鱼","隹","雨","齿"]},
    // {nb:9,key:["革","骨","音"]},
    // {nb:10,key:[]},
    // ];
    static bushouList = [
        {nb:1,key:["一","丿","丶","乙","乛","乚","亅","丨"]},
        {nb:2,key:["十","厂","匚","卜","冂","八","丷","人","亻","勹","儿","匕","几","亠","冫","冖","凵","卩","刂","刀","阝","力","又","厶","廴","讠","匕","二","入","㔾"]},
        {nb:3,key:["宀","艹","囗","口","门","子","小","大","马","山","巾","弓","辶","扌","彳","尢","尸","氵","工","士","土","夕","纟","干","彐","寸","犭","己","飞","饣","广","女","夂","廾","彡","巳","川","弋","幺","巛"]},
        {nb:4,key:["王","车","木","礻","火","灬","日","曰","文","月","水","长","戈","心","气","耂","父","贝","见","牛","牜","攵","支","比","爫","欠","片","止","户","斤","手","风","歹","韦","瓦","毛","牙","氏","旡","殳","犬","斗","无"]},
        {nb:5,key:["钅","衤","穴","疒","白","白","田","矢","石","母","目","立","龙","生","鸟","癶","罒","玉","禾","皿","瓜","皮"]},
        {nb:6,key:["衣","⺮","自","糸","米","覀","肉","舌","页","虫","舟","行","耳","色","羽","虍","羊","而","至","艮","缶"]},
        {nb:7,key:["足","走","酉","里","辛","身","角","豕","豆"]},
        {nb:8,key:["非","鱼","雨","隹","青","齿","采"]},
        {nb:9,key:["面","音","首","香","鬼","革","髟"]},
        {nb:10,key:["高"]},
        {nb:11,key:["麻","黄"]},
        {nb:12,key:["黑","黍","鼎"]},
        {nb:13,key:["鼠"]},
        {nb:14,key:["鼻"]}
    ];
    /*
        一丿丶乙乛乚亅丨
        十厂匚卜冂八丷人亻勹儿匕几亠冫冖凵卩刂刀阝力又厶廴讠匕二入㔾
        宀艹囗口门子小大马山巾弓辶扌彳尢尸氵工士土夕纟干彐寸犭己飞饣广女夂廾彡巳川弋幺巛
        王车木礻火灬日曰文月水长戈心气耂父贝见牛牜攵支比爫欠片止户斤手风歹韦瓦毛牙氏旡殳犬斗无
        钅衤穴疒白白田矢石母目立龙生鸟癶罒玉禾皿瓜皮
        衣⺮自糸米覀肉舌页虫舟行耳色羽虍羊而至艮缶
        足走酉里辛身角豕豆
        非鱼雨隹青齿采
        面音首香鬼革髟
        高
        麻黄
        黑黍鼎
        鼠
        鼻
    */
    static keList = [];

    //?              汉字，   拼音，   汉字意思，   课，  繁体,   部首，   复习
    constructor(pId, pHanzi, pPinyin, pHanziYisi, pKe, pFanti, pBushou, pFuxi) {

        this.id = pId;

        this.hanzi = pHanzi;
        this.pinyin = pPinyin;
        this.hanziYisi = z_firstLetterUppercase(pHanziYisi);
        this.ke = pKe;
        this.fanti = pFanti;
        this.ciyuList = [];
        this.vocRefList = [];
        this.bFuxi = (pFuxi != "");
        if (pBushou.includes("，")) {
            this.bushou = pBushou.split("，")[1].split("|")[1];
        } else {
            this.bushou = pBushou.split("|")[1];
        }
        if (!Hanzi.keList.includes(pKe)) {
            Hanzi.keList.push(pKe);
        }

        if (pFanti != "") {
            this.fantiList = pFanti.split(",");
        } else {
            this.fantiList = [];
        }
        
        Hanzi.list.forEach(h => {
            if (this.hanzi == h.hanzi) {
                console.log("FOUND ! " + this.hanzi + " " + this.id + " " + h.id);
            }
        });
        Hanzi.list.push(this);
    }

    addToCiyuList(pWord) {
        this.ciyuList.push(pWord);
    }

    addToRefList(pWord) {
        this.vocRefList.push(pWord);
    }
}

readFile("./tsv/NZH - 当代中文 汉字.tsv", "hanzi");

function readFile(pFile, pType) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                switch(pType) {
                    case "hanzi":
                        createHanzi(tsvFile);
                        break;
                    case "word":
                        createZ_WORD(tsvFile);
                        z_search();
                        break;
                    case "example":
                        fillExampleList(tsvFile);
                        break;
                    case "text":
                        fillTextList(tsvFile);
                        break;
                }
            }
        }
    }
    rawFile.send(null); 
}

function createHanzi(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                 汉字，      拼音，     汉字意思，  课，        繁体,      部首，     复习
        test = new Hanzi(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6]);
    }

    let z_select_lesson = document.getElementById("z_select_lesson");
    let lessonHTML = `<option value="all" class="zh_font" value="lesson" selected>课 Leçons</option>`;
    for(let i = Hanzi.keList.length-1; i >= 0; i--) {
        if (!Hanzi.keList[i].includes("+")) {
            lessonHTML += `<option value="${Hanzi.keList[i]}">第${Hanzi.keList[i]}课</option>`;
        }
    }
    z_select_lesson.innerHTML = lessonHTML;

    readFile("./tsv/NZH - 当代中文 课本.tsv", "word");
}

class Z_Word {
    static list = [];
    static keList = [];

    constructor(pId, pWord, pPinyin, pYisi, pGram = "", pKe = "", pFanti = "") {

        this.id = pId;
        this.word = pWord;
        this.pinyin = pPinyin;
        this.yisi = z_firstLetterUppercase(pYisi);
        this.gram = pGram;
        this.ke = pKe;
        this.fanti = pFanti;
        this.exampleList = [];

        if (!Z_Word.keList.includes(pKe)) Z_Word.keList.push(pKe);
        
        Z_Word.list.push(this);
    }
    addExample(pEx) {
        this.exampleList.push(pEx);
    }
}

function createZ_WORD(pFile, pType) {
    // console.log("4) Create Z_WORD");
    let row = pFile.split(/\r\n|\n/);
    let test;
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?               id, word,      pinyin,    yisi,      gram,      ke,        fanti        
        test = new Z_Word(id, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5]);
        id++;
    }

    readFile("./tsv/NZH - 当代中文 例子.tsv", "example");

    insertVocRefIntoHanzi();

    readFile("./tsv/NZH - 当代中文 课文.tsv", "text");
}

function fillExampleList(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        exampleList.push({
            phrase: row[i][0],
            lesson: row[i][1]
        })
        id++;
    }
    let cleanedWord = "";
    Z_Word.list.forEach(w => {
        exampleList.forEach(e => {
            cleanedWord = "";

            if (w.word.includes("[")) {
                cleanedWord = w.word.split("[")[0];
                cleanedWord = cleanedWord.slice(0, cleanedWord.length-1);
            } else {
                cleanedWord = w.word;
            }

            if (e.phrase.includes(cleanedWord)) {
                let example = { phrase: "", lesson: e.lesson };                
                for (let i = 0; i < e.phrase.length; i++) {
                    if (i <= e.phrase.length - cleanedWord.length) {
                        if (e.phrase.slice(i,cleanedWord.length+i) == cleanedWord) {
                            example.phrase += "<span style='color:red;font-weight:bold;'>"+e.phrase.slice(i,cleanedWord.length+i)+"</span>";
                            i += cleanedWord.length - 1;
                        } else {
                            example.phrase += e.phrase[i];
                        }
                    } else {
                        example.phrase += e.phrase[i];
                    }
                }
                w.addExample(example);
            }
        });
    });
}

function insertVocRefIntoHanzi() {
    Hanzi.list.forEach(h => {
        Z_Word.list.forEach(w => {
            if (w.ke.includes("+")) {
                if (w.word.includes(h.hanzi)) {
                    h.addToRefList({
                        hanzi: w.word,
                        pinyin: w.pinyin,
                        yisi: z_firstLetterUppercase(w.yisi),
                    });
                }
            } else {
                if (w.word.includes(h.hanzi)) {
                    h.addToCiyuList({
                        hanzi: w.word,
                        pinyin: w.pinyin,
                        yisi: z_firstLetterUppercase(w.yisi),
                    });
                }
            }
        });
    });
}

function fillTextList(pFile) {
    let row = pFile.split(/\r\n|\n/);
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        for (let j = 0; j < row[i][1].length; j++) {
            if (row[i][1][j] == " ") {
                row[i][1] = row[i][1].replace(" ", "<br/>");
            }
        }
        textList.push({
            lesson: row[i][0],
            text: row[i][1]
        });
    }
}

function z_firstLetterUppercase(pString) {
    if (pString != "") {
        if (pString[0] == "(") {
            return pString[0] + pString[1].toUpperCase() + pString.slice(2);
        } else {
            return pString[0].toUpperCase() + pString.slice(1);
        }
    }
    return "";
}