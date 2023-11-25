class Hanzi {

    static list = [];
    static bushouListRAW = [
        "亻","讠","阝","刂","冖","冫","十","八","人","厂","力","卩","廴","勹","厶","匚","冂",
        "彳","女","氵","口","饣","忄","土","扌","子","纟","马","艹","宀","辶","囗","彡","广","夕","寸","大","小","门","巾","山","犭","尸","弓","丬","廾","尢","夂",
        "木","日","王","车","火","礻","攵","灬","心","方","手","止","户","曰","父","爫","月",
        "目","钅","衤","疒","穴","立","田","石","矢","罒","皿","禾","白","鸟",
        "⺮","米","覀","页","舌","缶","耳","虫","虍","舟",
        "足","走","角","身",
        "鱼","隹","雨","齿",
        "革","骨","音"
    ];
    static bushouList  = [
    {nb:2,key:["亻","讠","阝","刂","冖","冫","十","八","人"," ","力","卩","廴","勹","厶","匚","冂"]},
    {nb:3,key:["彳","女","氵","口","饣","忄","土","扌","子","纟","马","艹","宀","辶","囗","彡","广","夕","寸","大","小","门","巾","山","犭","尸","弓","丬","廾","尢","夂"]},
    {nb:4,key:["木","日","王","车","火","礻","攵","灬","心","方","手","止","户","曰","父","爫","月"]},
    {nb:5,key:["目","钅","衤","疒","穴","立","田","石","矢","罒","皿","禾","白","鸟"]},
    {nb:6,key:["⺮","米","覀","页","舌","缶","耳","虫","虍","舟"]},
    {nb:7,key:["足","走","角","身"]},
    {nb:8,key:["鱼","隹","雨","齿"]},
    {nb:9,key:["革","骨","音"]},
    {nb:10,key:[]},
    ];
    static keList = [];

    //?          id,  hanzi,  pinyin, ciyu,  ciyuPinyin,  ciyuYisi,  hanzi yisi, ke,   fanti,      bushou       
    // constructor(pId, pHanzi, pPinyin, pCiyu, pCiyuPinyin, pCiyuYisi, pHanziYisi, pKe, pFanti = "", pBushou = "") {
    //?              汉字，   拼音，   汉字意思，   课，  繁体,   部首
    constructor(pId, pHanzi, pPinyin, pHanziYisi, pKe, pFanti, pBushou) {

        this.id = pId;

        this.hanzi = pHanzi;
        this.pinyin = pPinyin;
        // this.ciyu = pCiyu;
        // this.ciyuPinyin = pCiyuPinyin;
        // this.ciyuYisi = pCiyuYisi;
        this.hanziYisi = z_firstLetterUppercase(pHanziYisi);
        this.ke = pKe;
        this.fanti = pFanti;
        this.ciyuList = [];
        this.vocRefList = [];
        this.bushou = pBushou;
        if (!Hanzi.keList.includes(pKe)) {
            Hanzi.keList.push(pKe);
        }
        
        // this.cList = this.ciyu.split(" | ");
        // this.cpList = this.ciyuPinyin.split(" | ");
        // this.cyList = this.ciyuYisi.split(" | ");
        // for (let i = 0; i < this.cList.length; i++) {
        //     let lizi = {
        //         hanzi: this.cList[i],
        //         pinyin: this.cpList[i],
        //         yisi: z_firstLetterUppercase(this.cyList[i]),
        //     }
        //     this.ciyuList.push(lizi);
        // }

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

readHANZIFile("./tsv/NZH - 当代中文 汉字.tsv");

function readHANZIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createHanzi(tsvFile);
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
        //?                 汉字，      拼音，     词语，     词语拼音，     词语意思，  汉字意思，  课，        繁体,      部首
        //?              id,hanzi,     pinyin,    ciyu,      ciyuPinyin,  ciyuYisi,  hanziYisi,  ke,        fanti,     bushou       
        // test = new Hanzi(i, row[i][0], row[i][1], row[i][2], row[i][3],   row[i][4], row[i][5],  row[i][6], row[i][7], row[i][8]);
        //?                 汉字，      拼音，     汉字意思，  课，        繁体,      部首
        test = new Hanzi(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5]);
    }

    let z_select_lesson = document.getElementById("z_select_lesson");
    let lessonHTML = `<option value="all" class="zh_font" value="lesson" selected>课 Leçons</option>`;
    for(let i = Hanzi.keList.length-1; i >= 0; i--) {
        if (!Hanzi.keList[i].includes("+")) {
            lessonHTML += `<option value="${Hanzi.keList[i]}">第${Hanzi.keList[i]}课</option>`;
        }
    }
    z_select_lesson.innerHTML = lessonHTML;

    readZ_WORDFile("./tsv/NZH - 当代中文 课本.tsv");
}

class Z_Word {
    static list = [];
    static keList = [];

    constructor(pId, pWord, pPinyin, pYisi, pGram = "", pKe = "", pPlusAlpha = "") {

        this.id = pId;
        this.word = pWord;
        this.pinyin = pPinyin;
        this.yisi = z_firstLetterUppercase(pYisi);
        this.gram = pGram;
        this.ke = pKe;
        this.plusAlpha = pPlusAlpha

        if (!Z_Word.keList.includes(pKe)) Z_Word.keList.push(pKe);
        
        Z_Word.list.push(this);
    }
}

function readZ_WORDFile(pFile, pType = 0) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createZ_WORD(tsvFile, pType);
            }
        }
    }
    rawFile.send(null);   
    
    z_search();
}

function createZ_WORD(pFile, pType) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    let id = 1;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?               id, word,      pinyin,    yisi,      gram,      ke,        +α        
        test = new Z_Word(id, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5]);
        id++;
    }

    insertVocRefIntoHanzi();
}

function insertVocRefIntoHanzi() {
    // if (Z_Word.list.length < 350) {
    //     alert("WORD LIST > 350 : " + Z_Word.list.length);
    // }

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