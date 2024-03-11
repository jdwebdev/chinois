let zt_mode = "hanzi";
let zt_randomList = [];
let zt_winList = [];
let zt_failList = [];
let zt_select = id("zt_select");
let zt_select_filter = id("zt_select_filter");
let zt_h_select_lesson = id("zt_h_select_lesson");
let zt_w_select_lesson = id("zt_w_select_lesson");
let zt_h_select_lesson_container = id("zt_h_select_lesson_container");
let zt_w_select_lesson_container = id("zt_w_select_lesson_container");
let zt_select_training_type = id("zt_select_training_type");
let zt_hanzi_free_list = id("zt_hanzi_free_list");
let zt_hanzi_free = id("zt_hanzi_free");
let zt_pinyin_keyboard;
let zt_check_pinyin;
let bPinyinChecked = false;

none(zt_h_select_lesson);
none(zt_w_select_lesson);
let zt_range_input = id("zt_range_input");
none(zt_range_input);
none(zt_hanzi_free);

let zt_all_option = id("zt_all_option");
let zt_random_option = id("zt_random_option");
let zt_lesson_option = id("zt_lesson_option");

let zt_end = id("zt_end");
let zt_start = id("zt_start");

let zt_training_type = id("zt_training_type");
let zt_trainingFilters = id("zt_trainingFilters");
let zt_startBtn = id("zt_startBtn");
let zt_backBtn = id("zt_backBtn");

zt_select.addEventListener("change", e => {
    zt_all_option.selected = true;
    zt_selectFilterChange("lesson");
    let count = 0;
    switch (zt_select.value) {
        case "hanzi":
            zt_select_filter.innerHTML = `
                <option id="zt_all_option" class="zh_font" value="all">Tout</option>
                <option id="zt_lesson_option" class="zh_font" value="lesson" selected>课</option>
                <!--<option class="zh_font" value="xy">X-Y</option>-->
            `;
            
            break;
        case "word":
            zt_select_filter.innerHTML = `
                <option id="zt_all_option" class="zh_font" value="all">Tout</option>
                <option id="zt_lesson_option" class="zh_font" value="lesson" selected>课</option>
            `;
            break;
    }

});
zt_select_filter.addEventListener("change", e => {
    zt_selectFilterChange(zt_select_filter.value);
});
zt_startBtn.addEventListener("click", e => {
    e.preventDefault();
    if (zt_select_training_type.value == "pinyin" && zt_select.value == "word") {
        z_training_section.innerHTML = `<p class="zt_encours">EN COURS DE DÉVELOPPEMENT - PROCHAINEMENT DISPONIBLE</p>`;
    } else {
        if (zt_select_training_type.value == "free" && zt_hanzi_free_list.value == "") return;

        none(zt_hanzi_free);
        none(zt_training_type);
        none(zt_trainingFilters);
        none(switchModeBtn);
        block(zt_backBtn);
        zt_startTraining();
    }

});
zt_backBtn.addEventListener("click", e => {
    e.preventDefault();
    z_training_section.innerHTML = "";

    if (zt_select_training_type.value = "free") block(zt_hanzi_free);

    flex(zt_training_type);
    flex(zt_trainingFilters);
    none(zt_backBtn);
    block(switchModeBtn);
});

zt_select_training_type.addEventListener("change", e => {
    if (zt_select_training_type.value == "free") {
        let zt_referenceList = id("zt_referenceList");
        zt_referenceList.innerHTML = `Le caractère sera ignoré s'il n'est pas référencé parmi les ${Hanzi.list.length} caractères de l'application.`;
        block(zt_hanzi_free);

        none(zt_h_select_lesson);
        none(zt_w_select_lesson);
        none(zt_select);
        none(zt_select_filter);
    } else {
        none(zt_hanzi_free);

        block(zt_h_select_lesson);
        block(zt_w_select_lesson);
        block(zt_select);
        block(zt_select_filter);
    }
});


function zt_selectFilterChange(pOption) {
    switch (pOption) {
        case "all":
            none(zt_range_input);
            none(zt_h_select_lesson);
            none(zt_w_select_lesson);
            none(zt_h_select_lesson_container);
            none(zt_w_select_lesson_container);
            break;
        case "lesson":
            none(zt_range_input);

            if (zt_select.value == "hanzi") {
                block(zt_h_select_lesson_container);
                none(zt_w_select_lesson_container);
    
                if (zt_h_select_lesson.innerHTML == "") {
                    let lessonHTML = "";
                    for(let i = Hanzi.keList.length-1; i >= 0; i--) {
                        
                        lessonHTML += `<option value="${Hanzi.keList[i]}">第${Hanzi.keList[i]}课</option>`;
                        
                    }
                    zt_h_select_lesson.innerHTML = lessonHTML;
                    
                }
                flex(zt_h_select_lesson);

            } else if (zt_select.value == "word") {    
                none(zt_h_select_lesson_container);
                block(zt_w_select_lesson_container);
    
                if (zt_w_select_lesson.innerHTML == "") {
                    let lessonHTML = "";
                    for(let i = Z_Word.keList.length-1; i >= 0; i--) {
                        lessonHTML += `<option value="${Z_Word.keList[i]}">第${Z_Word.keList[i]}课</option>`;
                    }

                    zt_w_select_lesson.innerHTML = lessonHTML;
                }
                let up_arrow = id("up_arrow");
                let vocRef = id("vocRef");

                up_arrow.style.display = zt_w_select_lesson.value.includes("+") ? "block" : "none";
                vocRef.style.display = zt_w_select_lesson.value.includes("+") ? "block" : "none";
                
                flex(zt_w_select_lesson);

                zt_w_select_lesson.addEventListener("change", e => {
                    up_arrow.style.display = zt_w_select_lesson.value.includes("+") ? "block" : "none";
                    vocRef.style.display = zt_w_select_lesson.value.includes("+") ? "block" : "none";
                });
            }
            break;
    }
}

let zt_currentIndex = 0;

function zt_startTraining() {

    zt_failList = [];
    zt_winList = [];
    if (zt_nextBtn_container != null) {
        zt_nextBtn_container.innerHTML = "";
    }
    let filter = zt_select_filter.value;
    zt_randomList = [];
    zt_currentIndex = 0;
    zt_mode = zt_select.value;

    if (zt_select_training_type.value == "free") {
        filter = "free";
        zt_mode = "hanzi";
    }
    //? Check filters
    switch (zt_mode) {
        case "hanzi": //? Hanzi.list
            if (filter == "all") {
                for (let i = 0; i < Hanzi.list.length; i++) {
                    zt_randomList.push(Hanzi.list[i]);
                }
            } else if (filter == "lesson") {
                for (let i = 0; i < Hanzi.list.length; i++) {
                    if (Hanzi.list[i].ke == zt_h_select_lesson.value) {
                        zt_randomList.push(Hanzi.list[i]);
                    }
                }
            } else if (filter == "xy") {

                let sHanzi = "";
                Hanzi.list.forEach(h => {
                    sHanzi += h.hanzi;
                });
                for (let i = parseInt(zt_start.value)-1; i < parseInt(zt_end.value); i++) {
                    zt_randomList.push(Hanzi.list[i]);
                }
                sHanzi = "";
                zt_randomList.forEach(h => {
                    sHanzi += h.hanzi;
                });
            } else if (filter == "free") {
                for (let i = 0; i < Hanzi.list.length; i++) {
                    if (zt_hanzi_free_list.value.includes(Hanzi.list[i].hanzi)) {
                        zt_randomList.push(Hanzi.list[i]);
                    }
                }
            }
            zt_randomList = zt_randomizeList(zt_randomList);

            if (zt_select_training_type.value == "xiezi" || zt_select_training_type.value == "free") {

                zt_hanziXieziDisplayTraining();
            } else if (zt_select_training_type.value == "pinyin") {
                zt_hanziPinyinDisplayTraining();
            }
            
            break;
        case "word": //? Z_Word.lessonList
            if (filter == "all") {
                for (let i = 0; i < Z_Word.list.length; i++) {
                    zt_randomList.push(Z_Word.list[i]);
                }
            } else if (filter == "lesson") {
                for (let i = 0; i < Z_Word.list.length; i++) {
                    if (zt_w_select_lesson.value.includes("+")) {
                        let leftPart = zt_w_select_lesson.value.slice(0, zt_w_select_lesson.value.length -1)
                        if (Z_Word.list[i].ke == zt_w_select_lesson.value || Z_Word.list[i].ke == leftPart) {
                            zt_randomList.push(Z_Word.list[i]);
                        }
                    } else {
                        if (Z_Word.list[i].ke == zt_w_select_lesson.value) {
                            zt_randomList.push(Z_Word.list[i]);
                        }
                    }
                }
            }
            
            zt_randomList = zt_randomizeList(zt_randomList);
            if (zt_select_training_type.value == "xiezi") {
                zt_ZWordXieziDisplayTraining();
            } else if (zt_select_training_type.value == "pinyin") {
                // zt_hanziDisplayTraining();
            }
            // zt_ZWordDisplayTraining();
            break;
    }

}

let zt_hanzi; let zt_fanti; let zt_n; let zt_lizi; let zt_n_btn; let zt_kakunin;
let zt_word; let zt_word_fanti;
let zt_nextBtn_container = null;
let z_training_section = id("z_training_section");
let zt_progressBar;
let zt_list_up_arrow; let zt_list_bottom_arrow;

function zt_hanziXieziDisplayTraining() {
    let innerHTML = "";
    let fanti = (zt_randomList[zt_currentIndex].fanti != "") ? "？" : "";
    z_training_section.innerHTML = "";
    innerHTML = `
        <div id="zt_progressBar" class="progressBar zh_font"><span id="currentIndex">${zt_currentIndex+1}/${zt_randomList.length}</span></div>
        <p id="zt_hanzi" class="toFind zh_font">？
            <span id="zt_fanti">${fanti}</span>
        </p>
        `;
        /*
                汉字 = ?
            汉字拼音     汉子意思
            ------
            词语 = ?    词语意思
            词语拼音   
            ------
            词语 = ?    词语意思
            词语拼音  
            ------
            ......
        */
        innerHTML += 
        `
        <p class="zt_p zt_pinyin zh_font">${zt_randomList[zt_currentIndex].pinyin}</p>
        <p class="zt_p zt_hanziYisi">${zt_randomList[zt_currentIndex].hanziYisi}</p>
        <div class="zt_arrow_container"><span id="list_up_arrow">▲</span></div>
        <div id="zt_vocContainer" class="zt_vocContainer">
        `;
        

        let ciyuClass = "zt_ciyu zt_ciyuBorder";
        for (let i = 0; i < zt_randomList[zt_currentIndex].ciyuList.length; i++) {
            if (i > 0) ciyuClass = "zt_ciyu";
            innerHTML += `
                <div class="${ciyuClass}">
                    <div class="zt_ciyu_ciyuPinyin">
                        <p id="zt_wordToFind_${i}" class="zt_wordToFind zh_font">?</p>
                        <p class="zh_font">${zt_randomList[zt_currentIndex].ciyuList[i].pinyin}</p>
                    </div>
                    <p class="zt_yisi">${zt_randomList[zt_currentIndex].ciyuList[i].yisi}</p>
                </div>
            `;
        }

        ciyuClass = "zt_ciyu";
        for (let i = 0; i < zt_randomList[zt_currentIndex].vocRefList.length; i++) {
            innerHTML += `
                <div class="${ciyuClass}">
                    <div class="zt_ciyu_ciyuPinyin">
                        <p id="zt_wordToFind_${i}+" class="zt_wordToFind zh_font">?</p>
                        <p class="zh_font">${zt_randomList[zt_currentIndex].vocRefList[i].pinyin}</p>
                    </div>
                    <p class="zt_yisi">${zt_randomList[zt_currentIndex].vocRefList[i].yisi}</p>
                </div>
            `;
        }

        innerHTML += `
        </div>
        <div class="zt_arrow_container">
        <!--<span id="list_bottom_arrow_bord"></span>-->
        <span id="list_bottom_arrow">▼</span>
        </div>
        <button id="zt_kakunin" class="zh_font">Check</button>
        <div id="zt_nextBtn_container"></div>
    `;
    z_training_section.innerHTML = innerHTML;
    
    zt_progressBar = id("zt_progressBar");
    zt_progressBar.style.width = (zt_currentIndex / zt_randomList.length) * 100 + "%";
    zt_nextBtn_container = id("zt_nextBtn_container");
    zt_hanzi = id("zt_hanzi");
    zt_fanti = id("zt_fanti");

    zt_list_up_arrow = id("list_up_arrow");
    zt_list_bottom_arrow = id("list_bottom_arrow");
    none(zt_list_up_arrow);

    const zt_vocContainer = id("zt_vocContainer");
    if (zt_vocContainer.scrollHeight > 330) {
        block(zt_list_bottom_arrow);
    } else {
        none(zt_list_bottom_arrow);
    }
    zt_vocContainer.addEventListener("scroll", e => {
        if (zt_vocContainer.scrollTop > 0) {
            block(zt_list_up_arrow);
        } else {
            none(zt_list_up_arrow);
        }
        if (zt_vocContainer.scrollHeight - zt_vocContainer.scrollTop <= 330) {
            none(zt_list_bottom_arrow);
        } else {
            block(zt_list_bottom_arrow);
        }
    });

    
    zt_kakunin = id("zt_kakunin");
    zt_kakunin.addEventListener("click", e => {
        e.preventDefault();
        none(zt_kakunin);
        zt_hanzi.innerHTML = `${zt_randomList[zt_currentIndex].hanzi}
            <span id="zt_fanti">${zt_randomList[zt_currentIndex].fanti}</span>
        `;
        // console.log(zt_fanti);
        // console.log(zt_randomList[zt_currentIndex].fanti)

        for (let i = 0; i < zt_randomList[zt_currentIndex].ciyuList.length; i++) {
            let wordToFind = id("zt_wordToFind_"+i)
            wordToFind.innerHTML = zt_randomList[zt_currentIndex].ciyuList[i].hanzi
        }
        for (let i = 0; i < zt_randomList[zt_currentIndex].vocRefList.length; i++) {
            let wordToFind = id("zt_wordToFind_"+i+"+")
            wordToFind.innerHTML = zt_randomList[zt_currentIndex].vocRefList[i].hanzi
        }

        zt_nextBtn_container.innerHTML = `
            <button id="zt_fail" class="zh_font" onclick="zt_next(false)">错</button>
            <button id="zt_win" class="zh_font" onclick="zt_next(true)">对</button>
        `;
    });
    
}
function zt_hanziPinyinDisplayTraining() {
    bPinyinChecked = false;
    let innerHTML = "";
    let bFanti = false;
    z_training_section.innerHTML = "";
    innerHTML = `
        <div id="zt_progressBar" class="progressBar zh_font"><span id="currentIndex">${zt_currentIndex+1}/${zt_randomList.length}</span></div>
        <p id="zt_hanzi" class="toFind zh_font">${zt_randomList[zt_currentIndex].hanzi}</p>
        `;
    innerHTML += 
        `
        <p id="zt_pinyinToFind" class="zt_p zt_pinyin zh_font">?</p>
        <p class="zt_p zt_hanziYisi">${zt_randomList[zt_currentIndex].hanziYisi}</p>
        <form id="zt_pinyin_form" class="zt_pinyin_form forms" action="">
            <input class="search_input zh_font" id="zt_pinyin_input" type="text" placeholder="Écrivez le pinyin">
            <button id="zt_check_pinyin" class="searchBtn zh_font">Check</button>
        </form>

        <div id="zt_pinyin_keyboard">
            <ul>
                <li class="zt_button_list">
                    <div class="zt_pinyin_block">
                        <button onclick="insertPinyin('ā')">ā</button>
                        <button onclick="insertPinyin('á')">á</button>
                        <button onclick="insertPinyin('ǎ')">ǎ</button>
                        <button onclick="insertPinyin('à')">à</button>
                    </div>
                    <div class="zt_pinyin_block">
                        <button onclick="insertPinyin('ē')">ē</button>
                        <button onclick="insertPinyin('é')">é</button>
                        <button onclick="insertPinyin('ě')">ě</button>
                        <button onclick="insertPinyin('è')">è</button>
                    </div>
                </li>
                <li class="zt_button_list">
                    <div class="zt_pinyin_block">
                        <button onclick="insertPinyin('ī')">ī</button>
                        <button onclick="insertPinyin('í')">í</button>
                        <button onclick="insertPinyin('ǐ')">ǐ</button>
                        <button onclick="insertPinyin('ì')">ì</button>
                    </div>
                    <div class="zt_pinyin_block">
                        <button onclick="insertPinyin('ō')">ō</button>
                        <button onclick="insertPinyin('ó')">ó</button>
                        <button onclick="insertPinyin('ǒ')">ǒ</button>
                        <button onclick="insertPinyin('ò')">ò</button>
                    </div>
                </li>
                <li class="zt_button_list">
                    <div class="zt_pinyin_block">
                        <button onclick="insertPinyin('ū')">ū</button>
                        <button onclick="insertPinyin('ú')">ú</button>
                        <button onclick="insertPinyin('ǔ')">ǔ</button>
                        <button onclick="insertPinyin('ù')">ù</button>
                    </div>
                    <div class="zt_pinyin_block">
                        <button onclick="insertPinyin('ǖ')">ǖ</button>
                        <button onclick="insertPinyin('ǘ')">ǘ</button>
                        <button onclick="insertPinyin('ǚ')">ǚ</button>
                        <button onclick="insertPinyin('ǜ')">ǜ</button>
                    </div>
                </li>
            </ul>
        </div>

        <div class="zt_arrow_container"><span id="list_up_arrow">▲</span></div>
        <div id="zt_vocContainer" class="zt_vocContainer">
        `;
        let ciyuClass = "zt_ciyu zt_ciyuBorder";
        for (let i = 0; i < zt_randomList[zt_currentIndex].ciyuList.length; i++) {
            if (i > 0) ciyuClass = "zt_ciyu";
            innerHTML += `
                <div class="${ciyuClass}">
                    <div class="zt_ciyu_ciyuPinyin">
                        <p id="" class="zt_wordToFind zh_font">${zt_randomList[zt_currentIndex].ciyuList[i].hanzi}</p>
                        <p id="zt_pinyinToFind_${i}" class="zh_font">?</p>
                    </div>
                    <p class="zt_yisi">${zt_randomList[zt_currentIndex].ciyuList[i].yisi}</p>
                </div>
            `;
        }

        ciyuClass = "zt_ciyu";
        for (let i = 0; i < zt_randomList[zt_currentIndex].vocRefList.length; i++) {
            // if (i > 0) ciyuClass = "zt_ciyu";
            innerHTML += `
                <div class="${ciyuClass}">
                    <div class="zt_ciyu_ciyuPinyin">
                        <p id="" class="zt_wordToFind zh_font">${zt_randomList[zt_currentIndex].vocRefList[i].hanzi}</p>
                        <p id="zt_pinyinToFind_${i}+" class="zh_font">?</p>
                    </div>
                    <p class="zt_yisi">${zt_randomList[zt_currentIndex].vocRefList[i].yisi}</p>
                </div>
            `;
        }

        innerHTML += `
        </div>
        <div class="zt_arrow_container">
        <!--<span id="list_bottom_arrow_bord"></span>-->
        <span id="list_bottom_arrow">▼</span>
        </div>
        <div id="zt_pinyin_nextBtn_container"></div>
    `;
    z_training_section.innerHTML = innerHTML;
    // <span id="list_bottom_arrow">▼</span>
    
    zt_progressBar = id("zt_progressBar");
    zt_progressBar.style.width = (zt_currentIndex / zt_randomList.length) * 100 + "%";
    zt_nextBtn_container = id("zt_pinyin_nextBtn_container");
    zt_hanzi = id("zt_hanzi");

    zt_pinyin_keyboard = id("zt_pinyin_keyboard");

    let zt_pinyin_input = id("zt_pinyin_input");
    zt_pinyin_input.addEventListener("focus", e => {
        if (!bPinyinChecked) {
            block(zt_pinyin_keyboard);
        }
    });

    zt_list_up_arrow = id("list_up_arrow");
    zt_list_bottom_arrow = id("list_bottom_arrow");
    none(zt_list_up_arrow);

    const zt_vocContainer = id("zt_vocContainer");
    if (zt_vocContainer.scrollHeight > 330) {
        block(zt_list_bottom_arrow);
    } else {
        none(zt_list_bottom_arrow);
    }
    zt_vocContainer.addEventListener("scroll", e => {
        if (zt_vocContainer.scrollTop > 0) {
            block(zt_list_up_arrow);
        } else {
            none(zt_list_up_arrow);
        }
        if (zt_vocContainer.scrollHeight - zt_vocContainer.scrollTop <= 330) {
            none(zt_list_bottom_arrow);
        } else {
            block(zt_list_bottom_arrow);
        }
    });


    zt_check_pinyin = id("zt_check_pinyin");
    zt_check_pinyin.addEventListener("click", e => {
        e.preventDefault();
        if (!bPinyinChecked) {
            bPinyinChecked = true;
            none(zt_pinyin_keyboard);
            zt_pinyinToFind.innerHTML = zt_randomList[zt_currentIndex].pinyin;
            if (zt_pinyin_input.value.toLowerCase().trim() == zt_randomList[zt_currentIndex].pinyin.toLowerCase()) {
                zt_pinyinToFind.style.color = "rgb(0,200,0)";
                zt_nextBtn_container.innerHTML = `
                    <button id="zt_kakunin" onClick="zt_nextPinyin(true)" class="zh_font">Suivant</button>
                `;
            } else if (zt_randomList[zt_currentIndex].pinyin.includes("，")) {
                let okList = zt_randomList[zt_currentIndex].pinyin.split("，");
                let bOk = false;
                okList.forEach(p => {
                    if (zt_pinyin_input.value.toLowerCase().trim() == p.toLowerCase()) {
                        bOk = true;
                    }
                });
                if (bOk) {
                    zt_pinyinToFind.style.color = "rgb(0,200,0)";
                    zt_nextBtn_container.innerHTML = `
                        <button id="zt_kakunin" onClick="zt_nextPinyin(true)" class="zh_font">Suivant</button>
                    `;
                } else {
                    zt_pinyinToFind.style.color = "rgb(200,0,0)";
                    zt_nextBtn_container.innerHTML = `
                        <button id="zt_kakunin" onClick="zt_nextPinyin(false)" class="zh_font">Suivant</button>
                    `;
                }
            } else {
                zt_pinyinToFind.style.color = "rgb(200,0,0)";
                zt_nextBtn_container.innerHTML = `
                    <button id="zt_kakunin" onClick="zt_nextPinyin(false)" class="zh_font">Suivant</button>
                `;
            }
            none(zt_check_pinyin);
    
            for (let i = 0; i < zt_randomList[zt_currentIndex].ciyuList.length; i++) {
                let wordToFind = id("zt_pinyinToFind_"+i);
                wordToFind.innerHTML = zt_randomList[zt_currentIndex].ciyuList[i].pinyin;
            }
            for (let i = 0; i < zt_randomList[zt_currentIndex].vocRefList.length; i++) {
                let wordToFind = id("zt_pinyinToFind_"+i+"+");
                wordToFind.innerHTML = zt_randomList[zt_currentIndex].vocRefList[i].pinyin;
            }
        }

    });
    
}

function zt_ZWordXieziDisplayTraining() {
    let innerHTML = "";
    let fantiClass = zt_randomList[zt_currentIndex].fanti != "" ? "zt_word_fanti" : "zt_word_fanti_none"; 
    z_training_section.innerHTML = "";
    innerHTML = `
        <div id="zt_progressBar" class="progressBar"><span id="currentIndex">${zt_currentIndex+1}/${zt_randomList.length}</span></div>
        <p id="zt_word" class="toFind zh_font">？</p>
        <p id="zt_word_fanti" class="${fantiClass} zh_font">(繁體)</p>
        <p class="zt_p zt_pinyin zh_font">${zt_randomList[zt_currentIndex].pinyin}</p>
        <p class="zt_p zt_word_yisi zh_font">${zt_randomList[zt_currentIndex].yisi}</p>
        <button id="zt_kakunin" class="zh_font">Check</button>
        <div id="zt_nextBtn_container"></div>   
    `;
    z_training_section.innerHTML = innerHTML;

    zt_progressBar = id("zt_progressBar");
    zt_progressBar.style.width = (zt_currentIndex / zt_randomList.length) * 100 + "%";
    zt_nextBtn_container = id("zt_nextBtn_container");
    zt_word = id("zt_word");
    zt_word_fanti = id("zt_word_fanti");
    zt_kakunin = id("zt_kakunin");
    zt_kakunin.addEventListener("click", e => {
        e.preventDefault();
        none(zt_kakunin);
        zt_word.innerHTML = zt_randomList[zt_currentIndex].word;
        zt_word_fanti.innerHTML = zt_randomList[zt_currentIndex].fanti;
        zt_nextBtn_container.innerHTML = `
            <button id="zt_fail" class="zh_font" onclick="zt_next(false)">错</button>
            <button id="zt_win" class="zh_font" onclick="zt_next(true)">对</button>
        `;
    });
    
}

function zt_next(pWin) {
    if (pWin) {
        zt_winList.push(zt_randomList[zt_currentIndex])
    } else {
        zt_failList.push(zt_randomList[zt_currentIndex])
    }

    zt_currentIndex++;
    if (zt_currentIndex >= zt_randomList.length) { //? Affichage des Fails / Wins
        zt_currentIndex--;
        let innerHTML = "";
        switch(zt_mode) {
            case "hanzi":
                    if (zt_failList.length == 0) {
                        innerHTML = `
                            <p class="zh_font zt_result">BRAVO ! 0 erreur sur ${zt_randomList.length} !</p>
                            <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                            <ul>
                        `;
                        zt_randomList.forEach(h => {
                            innerHTML += `
                                <li class="result_fail_list zh_font">${h.hanzi} : ${h.pinyin}</li>
                            `;
                        });
                        innerHTML += "</ul>";
            
                    } else {
                        innerHTML = `
                            <p class="zh_font zt_result">Erreur(s) : ${zt_failList.length} sur ${zt_randomList.length} !</p>
                            <p></p>
                        `;
                        let sRawList = "";
                        zt_failList.forEach(h => {
                            sRawList += h.hanzi
                        });
                        
                        innerHTML += `
                            <p>${sRawList}</p>
                        `;
                        innerHTML += `
                            <ul>
                        `;
                
                        let failList = "";
                        zt_failList.forEach(h => {
                            failList += h.hanzi;
                            innerHTML += `
                                <li class="result_fail_list zh_font">${h.hanzi} : ${h.pinyin}</li>
                            `;
                        });
                        innerHTML += `</ul>`;
                        if (zt_failList.length < zt_randomList.length) {
                            innerHTML += `
                                <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                                <ul>
                            `;
                            zt_randomList.forEach(h => {
                                if (!failList.includes(h.hanzi)) {
                                    innerHTML += `
                                        <li class="result_fail_list zh_font">${h.hanzi} : ${h.pinyin}</li>
                                    `;
                                }
                            });
                            innerHTML += "</ul>";
                        }
                        
                    }

                break;
            case "word":
                if (zt_failList.length == 0) {
                    innerHTML = `
                        <p class="zh_font zt_result">BRAVO ! 0 erreur sur ${zt_randomList.length} !</p>
                        <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                        <ul>
                    `;
                    zt_randomList.forEach(h => {
                        innerHTML += `
                            <li class="result_fail_list zh_font">${h.word} : ${h.pinyin} : ${h.yisi}</li>
                        `;
                    });
                    innerHTML += "</ul>";
        
                } else {
                    innerHTML = `
                        <p class="zh_font zt_result">Erreur(s) : ${zt_failList.length} sur ${zt_randomList.length} !</p>
                        <ul>
                    `;
            
                    let failList = "";
                    zt_failList.forEach(h => {
                        failList += h.word;
                        innerHTML += `
                            <li class="result_fail_list zh_font">${h.word} : ${h.pinyin} : ${h.yisi}</li>
                        `;
                    });
                    innerHTML += `</ul>`;
                    if (zt_failList.length < zt_randomList.length) {
                        innerHTML += `
                            <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                            <ul>
                        `;
                        zt_randomList.forEach(h => {
                            if (!failList.includes(h.word)) {
                                innerHTML += `
                                    <li class="result_fail_list zh_font">${h.word} : ${h.pinyin} : ${h.yisi}</li>
                                `;
                            }
                        });
                        innerHTML += "</ul>";
                    }
                    
                }
                break;
        }
        
        z_training_section.innerHTML = innerHTML;
        zt_currentIndex++;
        
    } else {
        switch(zt_mode) {
            case "hanzi":
                zt_hanziXieziDisplayTraining();
                break;
            case "word":
                zt_ZWordXieziDisplayTraining();
                break;
        }
    }
}

function zt_nextPinyin(pWin) {
    if (pWin) {
        zt_winList.push(zt_randomList[zt_currentIndex])
    } else {
        zt_failList.push(zt_randomList[zt_currentIndex])
    }
    zt_currentIndex++;

    if (zt_currentIndex >= zt_randomList.length) {
        zt_currentIndex--;
        let innerHTML = "";
        switch(zt_mode) {
            case "hanzi":
                    if (zt_failList.length == 0) {
                        innerHTML = `
                            <p class="zh_font zt_result">BRAVO ! 0 erreur sur ${zt_randomList.length} !</p>
                            <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                            <ul>
                        `;
                        zt_randomList.forEach(h => {
                            innerHTML += `
                                <li class="result_fail_list zh_font">${h.hanzi} : ${h.pinyin}</li>
                            `;
                        });
                        innerHTML += "</ul>";
            
                    } else {
                        innerHTML = `
                            <p class="zh_font zt_result">Erreur(s) : ${zt_failList.length} sur ${zt_randomList.length} !</p>
                            <ul>
                        `;
                
                        let failList = "";
                        zt_failList.forEach(h => {
                            failList += h.hanzi;
                            innerHTML += `
                                <li class="result_fail_list zh_font">${h.hanzi} : ${h.pinyin}</li>
                            `;
                        });
                        innerHTML += `</ul>`;
                        if (zt_failList.length < zt_randomList.length) {
                            innerHTML += `
                                <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                                <ul>
                            `;
                            zt_randomList.forEach(h => {
                                if (!failList.includes(h.hanzi)) {
                                    innerHTML += `
                                        <li class="result_fail_list zh_font">${h.hanzi} : ${h.pinyin}</li>
                                    `;
                                }
                            });
                            innerHTML += "</ul>";
                        }
                        
                    }

                break;
            case "word":
                if (zt_failList.length == 0) {
                    innerHTML = `
                        <p class="zh_font zt_result">BRAVO ! 0 erreur sur ${zt_randomList.length} !</p>
                        <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                        <ul>
                    `;
                    zt_randomList.forEach(h => {
                        innerHTML += `
                            <li class="result_fail_list zh_font">${h.word} : ${h.pinyin} : ${h.yisi}</li>
                        `;
                    });
                    innerHTML += "</ul>";
        
                } else {
                    innerHTML = `
                        <p class="zh_font zt_result">Erreur(s) : ${zt_failList.length} sur ${zt_randomList.length} !</p>
                        <ul>
                    `;
            
                    let failList = "";
                    zt_failList.forEach(h => {
                        failList += h.word;
                        innerHTML += `
                            <li class="result_fail_list zh_font">${h.word} : ${h.pinyin} : ${h.yisi}</li>
                        `;
                    });
                    innerHTML += `</ul>`;
                    if (zt_failList.length < zt_randomList.length) {
                        innerHTML += `
                            <p class="zh_font zt_tooEasy">Trop facile <span class="zt_easy_heart">♥♥♥</span> :</p>
                            <ul>
                        `;
                        zt_randomList.forEach(h => {
                            if (!failList.includes(h.word)) {
                                innerHTML += `
                                    <li class="result_fail_list zh_font">${h.word} : ${h.pinyin} : ${h.yisi}</li>
                                `;
                            }
                        });
                        innerHTML += "</ul>";
                    }
                    
                }
                break;
        }
        
        z_training_section.innerHTML = innerHTML;
        zt_currentIndex++;
    } else {
        switch(zt_mode) {
            case "hanzi":
                zt_hanziPinyinDisplayTraining();
                break;
            case "word":
                zt_ZWordPinyinDisplayTraining();
                break;
        }
    }
}

function insertPinyin(pPinyin) {
    zt_pinyin_input.value += pPinyin;
    zt_pinyin_input.focus();
}

function zt_randomizeList(pList) {
    let tmp = 0;
    let rndIndex = 0;
    for (let i = 0; i < pList.length; i++) {
        rndIndex = rnd(0, pList.length);
        tmp = pList[i];
        pList[i] = pList[rndIndex];
        pList[rndIndex] = tmp;
    }

    return pList;
}