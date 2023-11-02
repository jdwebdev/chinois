let z_result_section = id("z_result_section");
let z_searchBtn = id("z_searchBtn");
let z_input = id("z_input");
let z_resultNb = id("z_resultNb");
let z_select = id("z_select"); //? 汉字 / 词语
let z_select_lesson = id("z_select_lesson");
let gramList = [];
let z_resultList = [];

fillGramList();

z_input.addEventListener("click", e => {
    let len = z_input.value.length;
    if (z_input.setSelectionRange) {
        z_input.focus();
        z_input.setSelectionRange(len, len);
    }
});

z_select.addEventListener("change", e => {
    z_input.value = "";
    let lessonHTML = "";
    if (z_select.value == "hanzi") {
        lessonHTML = `<option class="zh_font" value="all">课 Leçons</option>`;

        for(let i = Hanzi.keList.length-1; i >= 0; i--) {
            if (!Hanzi.keList[i].includes("+")) {
                lessonHTML += `<option value="${Hanzi.keList[i]}">第${Hanzi.keList[i]}课</option>`;
            }
        }

        z_select_lesson.innerHTML = lessonHTML;
        flex(z_select_lesson);
    } else if (z_select.value == "word") {
        lessonHTML = `<option class="zh_font" value="all">课 Leçons</option>`;

        for(let i = Z_Word.keList.length-1; i >= 0; i--) {
            if (!Z_Word.keList[i].includes("+")) {
                lessonHTML += `<option value="${Z_Word.keList[i]}">第${Z_Word.keList[i]}课</option>`;
            }
        }

        z_select_lesson.innerHTML = lessonHTML;
        flex(z_select_lesson);
    }
    z_search();
});
z_select_lesson.addEventListener("change", e => {
    if (z_select_lesson.value == "all") {
        
    } else {
        z_search();
    }
});

z_searchBtn.addEventListener("click", e => {
    e.preventDefault();
    z_search(true);
});

function z_search(pFromBtn = false) {
    z_result_section.innerHTML = "";
    z_resultNb.innerHTML = "";
        
    let innerHTML = "";
    switch(z_select.value) {
        case "hanzi":
            if (z_select_lesson.value != "all" && !pFromBtn) {
                innerHTML = "";
                z_resultList = [];
                Hanzi.list.forEach(h => {
                    if (h.ke == z_select_lesson.value) {
                        z_resultList.push(h);
                    }
                });
                let count = 0;
                for (let i = 0; i < z_resultList.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",z_resultList)'>" + z_resultList[i].hanzi + "</div>";
                    count++;
                    
                    if (i+1 == z_resultList.length) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }

                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length + " résultats";

            } else if (z_input.value == "") {
                let count = 0;

                for (let i = Hanzi.list.length-1; i >= 0; i--) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }

                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",Hanzi.list)'>" + Hanzi.list[i].hanzi + "</div>";
                    count++;
                    
                    if (i == 0) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                // for (let i = 0; i < Hanzi.list.length; i++) {
                //     if (count == 0) {
                //         innerHTML += "<div class='one_line'>";
                //     }

                //     innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",Hanzi.list)'>" + Hanzi.list[i].hanzi + "</div>";
                //     count++;
                    
                //     if (i+1 == Hanzi.list.length) {
                //         if (count < 6) {
                //             let diff = 6 - count;
                //             for (j=0; j < diff; j++) {
                //                 innerHTML += "<div class='no_border'>" + "" + "</div>";
                //             }
                //             count = 6;
                //         }
                //     }
                //     if (count == 6) {
                //         innerHTML += "</div>";
                //         count = 0;
                //     }
                // }
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = Hanzi.list.length + " résultats";

            } else {

                
                let idList = [];
                z_resultList = [];
                Hanzi.list.forEach(h => {
                    if (h.hanzi.includes(z_input.value)) {
                        if (!idList.includes(h.id)) {
                            idList.push(h.id);
                            z_resultList.unshift(h);
                        }
                    } else {
                        if (cleanPinyin(h.pinyin).includes(cleanPinyin(z_input.value.toLowerCase()))) {
                            if (!idList.includes(h.id)) {
                                idList.push(h.id);
                                if (cleanPinyin(h.pinyin) == cleanPinyin(z_input.value.toLowerCase())) {
                                    z_resultList.unshift(h);
                                } else {
                                    z_resultList.push(h);
                                }
                            }
                        }
                        //  else if (cleanPinyin(h.ciyuPinyin).includes(z_input.value.toLowerCase())) {
                        //     if (!idList.includes(h.id)) {
                        //         idList.push(h.id);
                        //         z_resultList.push(h);
                        //     }    
                        // } 
                        else if (h.ciyu.includes(z_input.value)) {
                            if (!idList.includes(h.id)) {
                                idList.push(h.id);
                                z_resultList.push(h);
                            }
                        } else if (h.ciyuYisi.includes(z_input.value)) {
                            // if (!idList.includes(h.id)) {
                            //     idList.push(h.id);
                            //     z_resultList.push(h);
                            // }
                        } else if (h.hanziYisi.includes(z_input.value)) {
                            if (!idList.includes(h.id)) {
                                idList.push(h.id);
                                z_resultList.push(h);
                            }
                        }
                    }

                    /*
                    this.ciyu = pCiyu;
                    this.ciyuPinyin = pCiyuPinyin;
                    this.ciyuYisi = pCiyuYisi;
                    this.hanziYisi
                    */
                    // else if (h.ciyu.includes(z_input.value.))
                });
                let count = 0;
                for (let i = 0; i < z_resultList.length; i++) {
                    if (count == 0) {
                        innerHTML += "<div class='one_line'>";
                    }
                    innerHTML += "<div id='hanzi_" + i + "' class='zh_font' onclick='openHanziPopup("+i+",z_resultList)'>" + z_resultList[i].hanzi + "</div>";
                    count++;
                    if (i+1 == z_resultList.length) {
                        if (count < 6) {
                            let diff = 6 - count;
                            for (j=0; j < diff; j++) {
                                innerHTML += "<div class='no_border'>" + "" + "</div>";
                            }
                            count = 6;
                        }
                    }
                    if (count == 6) {
                        innerHTML += "</div>";
                        count = 0;
                    }
                }
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length + " résultats";
            }
            break;
            
        case "word":
            innerHTML = "";

            if (z_select_lesson.value != "all" && !pFromBtn) {
                innerHTML = "";
                z_resultList = [];
                Z_Word.list.forEach(w => {
                    if (w.ke == z_select_lesson.value) {
                        z_resultList.push(w);
                    } else if (w.ke == z_select_lesson.value+"+") {

                        z_resultList.push(w);
                    }
                });

                let bgColor_class = "";
                for (let i = 0; i < z_resultList.length; i++) {
                    if (z_resultList[i].ke.includes("+")) bgColor_class = "z_one_result_color";
                    innerHTML += `
                        <div id="z_word_${z_resultList[i].id}" class="zh_font z_one_result ${bgColor_class}" onclick="openZ_WordPopup(${z_resultList[i].id-1},Z_Word.list)">${z_resultList[i].word}</div>
                    `;
                }


                // z_resultList.forEach(w => {
                //     innerHTML += `
                //         <div class="word_one_line">
                //             <div id="z_word_${w.id}" class="zh_font" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">${w.word}</div>
                //         </div>
                //     `;
                // });


                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length + " résultats";
            } else if (z_input.value == "") {
                let bgColor_class = "";
                for (let i = 0; i < Z_Word.list.length; i++) {
                    if (Z_Word.list[i].ke.includes("+")) {
                        bgColor_class = "z_one_result_color";
                    } else {
                        bgColor_class = "";
                    }
                    innerHTML += `
                        <div id="z_word_${Z_Word.list[i].id}" class="zh_font z_one_result ${bgColor_class}" onclick="openZ_WordPopup(${Z_Word.list[i].id-1},Z_Word.list)">${Z_Word.list[i].word}</div>
                    `;
                }
                
                // for (let i = Z_Word.list.length - 1; i >= 0; i--) {
                //     innerHTML += `
                //         <div class="word_one_line">
                //             <div id="z_word_${Z_Word.list[i].id}" class="zh_font" onclick="openZ_WordPopup(${Z_Word.list[i].id-1},Z_Word.list)">${Z_Word.list[i].word}</div>
                //         </div>
                //     `;
                // }
                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = Z_Word.list.length + " résultats";
                
            } else {
                innerHTML = "";
                z_resultList = [];
                Z_Word.list.forEach(w => {
                    if (w.word.includes(z_input.value)) {
                        z_resultList.push(w);
                    } else if (cleanPinyin(w.pinyin).includes(z_input.value.toLowerCase())) {
                        z_resultList.push(w);
                    } else if (w.yisi.includes(z_input.value)) {
                        z_resultList.push(w);
                    }
                    // if (h.pinyin.includes(z_input.value)) {
                    //     z_resultList.push(h);
                    // }
                });
                z_resultList.forEach(w => {
                    innerHTML += `
                        <div class="word_one_line" onclick="openZ_WordPopup(${w.id-1},Z_Word.list)">
                            <div id="z_word_${w.id}" class="zh_font">${w.word}</div>
                        </div>
                    `;
                });

                z_result_section.innerHTML = innerHTML;
                z_resultNb.innerHTML = z_resultList.length + " résultats";
            }

            break;

    }

    z_result_section.scrollTop = 0;
}

function openHanziPopup(id, list) {
    let innerHTML = ""
    popup.innerHTML = "";

    innerHTML = `
        <div id="oneResult" class="oneResult">
        <div class="word_container">
            <!-- <span class="hanziYisi zh_font">${list[id].ciyuYisi}</span> -->
            <div class="hanzi zh_font">
                ${list[id].hanzi}
                <span class="fanti zh_font">${list[id].fanti != "" ? "("+list[id].fanti+")" : ""}</span>
            </div>
            <div class="zh_font">${list[id].pinyin}</div>
        </div>
    `;

    if (list[id].hanziYisi != "") {
        innerHTML += `
            <div class="hanzi_yisi">
                ${list[id].hanziYisi}
            </div>
        `;
    }
    innerHTML += `
        <div class="word_details">
            <ul>
    `;
    let class_z_voc = "z_voc";
    for (let i = 0; i < list[id].ciyuList.length; i++) {
        if (i == list[id].ciyuList.length - 1 && list[id].vocRefList.length == 0) class_z_voc = "z_voc z_voc_last";
        innerHTML += `
            <li id="z_voc_${id}_${i}" class="${class_z_voc}">
                <div class="z_voc_cy">
                    <p class="voc_ciyu zh_font">${list[id].ciyuList[i].hanzi}</p>
                    <p id="voc_pinyin_void_${id}_${i}" class="voc_pinyin_void"><span class="void_span">?</span></p>
                    <p id="voc_pinyin_${id}_${i}" class="voc_pinyin zh_font" style="display:none">${list[id].ciyuList[i].pinyin}</p>
                </div>
                <p class="voc_fayu">${list[id].ciyuList[i].yisi}</p>
            </li>
        `;
    };
    class_z_voc = "z_voc z_vocRef";
    for (let i = 0; i < list[id].vocRefList.length; i++) {
        if (i == list[id].vocRefList.length - 1) class_z_voc = "z_voc z_vocRef z_voc_last";
        innerHTML += `
            <li id="z_voc_${id}_${i}+" class="${class_z_voc}">
                <div class="z_voc_cy">
                    <p class="voc_ciyu zh_font">${list[id].vocRefList[i].hanzi}</p>
                    <p id="voc_pinyin_void_${id}_${i}+" class="voc_pinyin_void"><span class="void_span void_ref_span">?</span></p>
                    <p id="voc_pinyin_${id}_${i}+" class="voc_pinyin zh_font" style="display:none">${list[id].vocRefList[i].pinyin}</p>
                </div>
                <p class="voc_fayu">${list[id].vocRefList[i].yisi}</p>
            </li>
        `;
    };

    innerHTML += `
                </ul>
            </div>
        </div>
    `;

    popup.innerHTML = innerHTML;

    for (let i = 0; i < list[id].ciyuList.length; i++) {
        const z_voc = document.getElementById("z_voc_" + id + "_" + i);
        const voc_pinyin_void = document.getElementById("voc_pinyin_void_" + id + "_" + i);
        const voc_pinyin = document.getElementById("voc_pinyin_" + id + "_" + i);
        z_voc.addEventListener("click", e => {
            if (voc_pinyin.style.display == "none") {
                flex(voc_pinyin);
                none(voc_pinyin_void);
            } else {
                none(voc_pinyin);
                flex(voc_pinyin_void);
            }
        });
    }

    for (let i = 0; i < list[id].vocRefList.length; i++) {
        const z_voc = document.getElementById("z_voc_" + id + "_" + i + "+");
        const voc_pinyin_void = document.getElementById("voc_pinyin_void_" + id + "_" + i + "+");
        const voc_pinyin = document.getElementById("voc_pinyin_" + id + "_" + i + "+");
        z_voc.addEventListener("click", e => {
            if (voc_pinyin.style.display == "none") {
                flex(voc_pinyin);
                none(voc_pinyin_void);
            } else {
                none(voc_pinyin);
                flex(voc_pinyin_void);
            }
        });
    }


    let oneResult = document.getElementById("oneResult");
    oneResult.addEventListener("click", e => {
        e.stopPropagation();
    });
    openModal();
}

function openZ_WordPopup(id, list) {
    popup.innerHTML = "";
    let windowWidth = window.innerWidth;
    popup.innerHTML = `
        <div id="oneResult" class="oneResult">
            <div class="word_container">
            <div class="hanzi zh_font">${list[id].word}</div>
            </div>
            <div id="z_word_container" class="word_details" style="position:relative">
                <p id="z_word_pinyin_void" class="z_word_pinyin_void zh_font"><span class="z_word_pinyin_void_span">?</span></p>
                <p id="z_word_pinyin"  class="z_word_pinyin zh_font" style="display:none">${list[id].pinyin}</p>
                <p>${list[id].yisi}</p>
                <p class="z_gram">${gramList[list[id].gram] != undefined ? "["+gramList[list[id].gram]+"]" : ""}</p>
                <span class="lesson_number">Leçon ${list[id].ke}</span>
            </div>
        </div>
    `;

    const z_word_container = document.getElementById("z_word_container");
    const z_word_pinyin_void = document.getElementById("z_word_pinyin_void");
    const z_word_pinyin = document.getElementById("z_word_pinyin");
    z_word_container.addEventListener("click", e => {
        if (z_word_pinyin.style.display == "none") {
            block(z_word_pinyin);
            none(z_word_pinyin_void);
        } else {
            none(z_word_pinyin);
            flex(z_word_pinyin_void);
        }
    });

    let oneResult = document.getElementById("oneResult");
    oneResult.addEventListener("click", e => {
        e.stopPropagation();
    });

    openModal();
}

function fillGramList() {
    gramList["N."] = "Nom";
    gramList["M.P."] = "Mot de position";
    gramList["M.T."] = "Mot de temps";
    gramList["Loc."] = "Locatif";
    gramList["Pron."] = "Pronom";
    gramList["Pron.Int"] = "Pronom interrogatif";
    gramList["V."] = "Verbe";
    gramList["V.D."] = "Verbe de direction";
    gramList["V.Aux"] = "Verbe auxiliaire";
    gramList["Adj."] = "Adjectif";
    gramList["Num."] = "Numéral";
    gramList["Spec."] = "Spécificatif";
    gramList["Adv."] = "Adverbe";
    gramList["Prep."] = "Préposition";
    gramList["Conj."] = "Conjonction";
    gramList["Part."] = "Particule";
    gramList["S."] = "Sujet";
    gramList["P."] = "Prédicat";
    gramList["O."] = "Complément d'objet";
    gramList["Deter."] = "Déterminatif";
    gramList["Comple."] = "Complément";
    gramList["C.C."] = "Complément circonstanciel";
    gramList["V & N"] = "Verbe & Nom";
    gramList["Prep & V"] = "Préposition & Verbe";
    gramList["N & Spec"] = "Nom & spécificatif";
    // gramList["V & V.M"] = "Verbe & verbe de ?";
    // gramList["V.M."] = "Verbe de ?";
    gramList["N & V.D"] = "Nom & Verbe de direction";
}