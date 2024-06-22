// let appVersion = "1.1";
let log = console.log.bind();
let body = document.getElementsByTagName("body")[0];
let header = id("header");
let mainListing = id("main_listing");
let mainTraining = id("main_training");
none(mainTraining);
let activeBtn = "n";
let activeColor = "rgba(200,200,200,1)";
let inactiveColor = "rgba(217,160,102,1)";
let languagesList = ["n", "z", "h"];
let sectionList = [];
let sectionTrainingList = [];
let switchModeBtn = id("switchMode");
switchModeBtn.addEventListener("click", e => {
    e.preventDefault();
    switchMode();
});
let helpButton = id("help_button");
helpButton.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    if (!bModal) openModalHelp();
});
let mainTitle = id("main_title");
let currentMode = 0; //? 0: List | 1: Training

let resultSection = id("result_section");

let modal = id("modal");
let popup = id("popup");
let bModal = false;
let modal_help = id("modal_help");
let popup_help = id("popup_help");
let bModalHelp = false;

header.addEventListener("click", e => {
    if (bModal) closeModal();
    if (bModalHelp) closeModalHelp();
});

popup.addEventListener("click", e => {
    closeModal();
});
modal.addEventListener("click", e => {
    closeModal();
});
modal_help.addEventListener("click", e => {
    closeModalHelp();
});

function switchMode() {
    if (currentMode) {//? Training to Listing
        currentMode = 0;
        mainTitle.innerHTML = "汉语 - 课";
        switchModeBtn.innerHTML = "⇒ Entraîn.";
        block(mainListing);
        none(mainTraining);
    } else {
        mainTitle.innerHTML = "汉语 - 练习";
        switchModeBtn.innerHTML = "⇒ Leçon";
        zt_selectFilterChange("lesson");
        currentMode = 1;
        block(mainTraining);
        none(mainListing);
    }
}

function openModal() {
    bModal = true;
    body.classList.add("no-scroll");
    editClass(modal, "fadeIn",true);
    modal.style.zIndex = 10;
}

function closeModal() {
    modal.classList.remove("fadeIn");
    if (bModal) {
        body.classList.remove("no-scroll");
        bModal = false;
    }
    z_result_section.focus();
}
function openModalHelp() {
    popup_help.innerHTML = `
        <div id="help_container">
            <div id="help_content">

                <p class="date zh_font">2024年6月22日<span class="app_version zh_font">V. 4.10</span></p>
                <h2 class="help_title">Ajout de la leçon 4-10</h2>

                <p class="date zh_font">2024年6月13日<span class="app_version zh_font">V. 4.9</span></p>
                <h2 class="help_title">Ajout de la leçon 4-9</h2>

                <p class="date zh_font">2024年6月10日<span class="app_version zh_font">V. 4.8</span></p>
                <h2 class="help_title">Ajout de la leçon 4-8</h2>

                <p class="date zh_font">2024年5月28日<span class="app_version zh_font">V. 4.7</span></p>
                <h2 class="help_title">Ajout de la leçon 4-7</h2>

                <p class="date zh_font">2024年5月22日<span class="app_version zh_font">V. 4.6</span></p>
                <h2 class="help_title">Ajout de la leçon 4-6</h2>

                <p class="date zh_font">2024年5月15日<span class="app_version zh_font">V. 4.5</span></p>
                <h2 class="help_title">Ajout de la leçon 4-5</h2>

                <p class="date zh_font">2024年5月06日<span class="app_version zh_font">V. 4.4</span></p>
                <h2 class="help_title">Ajout de la leçon 4-4</h2>

                <p class="date zh_font">2024年4月20日<span class="app_version zh_font">V. 4.3</span></p>
                <h2 class="help_title">Ajout de la leçon 4-3</h2>

                <p class="date zh_font">2024年4月07日<span class="app_version zh_font">V. 4.2</span></p>
                <h2 class="help_title">Ajout de la leçon 4-2</h2>

                <p class="date zh_font">2024年3月19日<span class="app_version zh_font">V. 4.1</span></p>
                <h2 class="help_title">Ajout de la leçon 4-1</h2>

                <p class="date zh_font">2024年3月5日<span class="app_version zh_font">V. 4.0</span></p>
                <h2 class="help_title">Ajout de la leçon 3-12</h2>

                <p class="date zh_font">2024年2月29日<span class="app_version zh_font">V. 3.9</span></p>
                <h2 class="help_title">Ajout de la leçon 3-11</h2>

                <p class="date zh_font">2024年2月20日<span class="app_version zh_font">V. 3.8</span></p>
                <h2 class="help_title">Ajout de la leçon 3-10</h2>

                <p class="date zh_font">2024年2月16日<span class="app_version zh_font">V. 3.7</span></p>
                <h2 class="help_title">Ajout de la leçon 3-9</h2>

                <p class="date zh_font">2024年2月13日<span class="app_version zh_font">V. 3.6</span></p>
                <h2 class="help_title">Ajout de la leçon 3-8</h2>

                <p class="date zh_font">2024年2月5日<span class="app_version zh_font">V. 3.5</span></p>
                <h2 class="help_title">Ajout de la leçon 3-7</h2>

                <p class="date zh_font">2024年1月22日<span class="app_version zh_font">V. 3.4</span></p>
                <h2 class="help_title">Ajout de la leçon 3-6</h2>

                <p class="date zh_font">2024年1月19日<span class="app_version zh_font">V. 3.3</span></p>
                <h2 class="help_title">Ajout de la leçon 3-5</h2>

                <p class="date zh_font">2024年1月15日<span class="app_version zh_font">V. 3.2</span></p>
                <h2 class="help_title">Ajout de la leçon 3-4</h2>

                <p class="date zh_font">2024年1月13日<span class="app_version zh_font">V. 3.1</span></p>
                <h2 class="help_title">Ajout de la leçon 3-3</h2>

                <p class="date zh_font">2024年1月11日<span class="app_version zh_font">V. 3.0</span></p>
                <h2 class="help_title">Ajout de la leçon 3-2</h2>

                <p class="date zh_font">2024年1月9日<span class="app_version zh_font">V. 2.9</span></p>
                <h2 class="help_title">Ajout de la leçon 3-1</h2>
                <p>Le numéro de leçon "3-1" correspond à la leçon 1 du manuel n°3 (第三册) de couleur jaune. Même logique pour les leçons suivantes 3-2, 3-3 etc.</p>

                <p class="date zh_font">2024年1月7日<span class="app_version zh_font">V. 2.8</span></p>
                <h2 class="help_title">Ajout de 151 caractères</h2>
                <p>Caractères présents dans le vocabulaire des leçons 1 à 20 mais non présents dans les livres de caractères. Ces 151 caractères sont séparés en 3 "leçons" 2,1; 2,2 et 2,3</p>

                <p class="date zh_font">2024年1月5日<span class="app_version zh_font">V. 2.7</span></p>
                <h2 class="help_title">Ajout de la leçon "21"</h2>
                <p>N'est pas une leçon à part entière mais correspond aux textes de fin : 熊猫 et 在婚礼上</p>

                <p class="date zh_font">2024年1月4日<span class="app_version zh_font">V. 2.6</span></p>
                <h2 class="help_title">Ajout de la leçon 20</h2>

                <p class="date zh_font">2024年1月2日<span class="app_version zh_font">V. 2.5</span></p>
                <h2 class="help_title">Ajout de la leçon 19</h2>

                <p class="date zh_font">2024年1月1日<span class="app_version zh_font">V. 2.4</span></p>
                <h2 class="help_title">Ajout de la leçon 18</h2>

                <p class="date zh_font">2023年12月30日<span class="app_version zh_font">V. 2.3</span></p>
                <h2 class="help_title">Ajout de la leçon 17</h2>

                <p class="date zh_font">2023年12月30日<span class="app_version zh_font">V. 2.2</span></p>
                <h2 class="help_title">Ajout des textes des différentes leçons</h2>

                <p class="date zh_font">2023年12月29日<span class="app_version zh_font">V. 2.1</span></p>
                <h2 class="help_title">Ajout de la leçon 16</h2>

                <p class="date zh_font">2023年12月26日<span class="app_version zh_font">V. 2.0</span></p>
                <h2 class="help_title">Ajout de la leçon 15</h2>

                <p class="date zh_font">2023年12月25日<span class="app_version zh_font">V. 1.9</span></p>
                <h2 class="help_title">Ajout de la leçon 14</h2>

                <p class="date zh_font">2023年12月23日<span class="app_version zh_font">V. 1.8</span></p>
                <h2 class="help_title">Ajout de la leçon 13</h2>

                <p class="date zh_font">2023年12月22日<span class="app_version zh_font">V. 1.7</span></p>
                <h2 class="help_title">Ajout de la leçon 12</h2>

                <p class="date zh_font">2023年12月21日<span class="app_version zh_font">V. 1.6</span></p>
                <h2 class="help_title">Listing de phrases d'exemple pour les mots de vocabulaire.</h2>

                <p class="date zh_font">2023年12月18日<span class="app_version zh_font">V. 1.5</span></p>
                <h2 class="help_title">Ajout de la leçon 11</h2>

                <p class="date zh_font">2023年12月13日<span class="app_version zh_font">V. 1.4</span></p>
                <h2 class="help_title">Ajout de la leçon 10</h2>

                <p class="date zh_font">2023年11月25日<span class="app_version zh_font">V. 1.3</span></p>
                <h2 class="help_title">Ajout de la leçon 9</h2>

                <p class="date zh_font">2023年11月23日<span class="app_version zh_font">V. 1.2</span></p>
                <h2 class="help_title">Meilleur affichage mobile pour les téléphones à écran large</h2>

                <p class="date zh_font">2023年11月18日<span class="app_version zh_font">V. 1.1</span></p>
                <h2 class="help_title">Ajout de la leçon 8</h2>

                <p class="date zh_font">2023年11月2日<span class="app_version zh_font">V. 1.0</span></p>
                
                <h2 class="help_title">Bienvenue dans ma petite appli</h2>

                <div class="separation"></div>

                <p>Elle se compose de 2 sections : </p>
                <p>课 (kè) : Leçon</p>
                <p>练习 (liànxí) : Entraînement</p>
                <p>Elles sont divisées en 2 catégories.</p>
                <div class="separation"></div>
                <h3>课 Leçon</h3>
                <div class="separation"></div>
                <h4>汉字 Les caractères</h4>
                <p>
                    Les caractères de la liste sont triés par leçon. 
                    Ce sont les leçons du livre de caractères, pour ceux qui ne le possèdent pas elles commencent à la leçon 0 avec quelques caractères de base (cheval, rivière etc.). 
                    Puis les caractères des leçons suivantes sont calqués sur les mots de vocabulaire <i>principaux</i> des leçons. 
                    En général les caractères du vocabulaire de référence en fin de leçon ou dans le cahier d'exercices ne sont pas concernés.
                    <br>
                    Les pinyin des mots sont cachés par défaut, il suffit de cliquer sur la ligne correspondante afin de les afficher. 
                    Comme ça vous pouvez vous tester avant de checker la prononciation :)
                </p>
                <div class="separation"></div>
                <h4>词语 Les mots</h4>
                <p>
                    Les mots de vocabulaire sont bien entendu tirés du livre de cours. 
                    Petite particularité, j'ai effectué une séparation entre les mots de vocabulaire principaux de début de leçon et le vocabulaire de référence. 
                    Le "problème" avec le voc de référence est qu'il n'est pas toujours pertinent, d'où la séparation (les mots en rouge clair dans le listing du voc). 
                    Cependant en avançant dans les leçons certains de ces mots deviennent plus pertinents et/ou la professeure considère qu'il sont potentiellement "connus". 
                    Du coup il vaudra quand même mieux les apprendre au cas où. Et au pire ignorer ceux qu'on sent qu'ils sont vraiment pas utiles dans l'immédiat. 
                    Je dis ça notamment par rapport à la partie entraînement où ils apparaîtront. À terme, je les fusionnerai peut être juste avec le vocabulaire principal, à voir selon vos retours.
                    Il me restera à ajouter certains mots de vocabulaire apparaissant dans le cahier d'exercice, ou éventuellement vus en cours, même si ces derniers ne comptent pas pour le test.
                </p>
                <div class="separation"></div>
                <h3>练习 Entraînement</h3>
                <div class="separation"></div>
                <p>
                    En ce qui concerne la partie entraînement. 
                    J'ai séparé la partie vocabulaire en deux parties : leçons 1, 2 etc. et en leçons 1+, 2+ etc. 
                    Le "+" correspondant au voc de base + le voc de référence. 
                    Au final autant faire directement la version +. Et ignorer les mots moins pertinents.
                </p>
                <p>
                    J'ai actuellement créé deux types d'entraînement : 
                    <br>
                    <br>
                    <b>Écriture : </b>Le caractère ou le mot est caché et vous devez essayer de le retrouver (de tête), l'idéal serait que vous essayiez de l'écrire sur une feuille et ensuite vérifier la réponse. 
                    Si vous avez bon vous cliquez sur 对duì ou 错cuò si vous avez faux.
                    <br>
                    Bon il est facile de tricher du coup mais ça n'aurait pas d'intérêt.
                    <br>
                    Je sais que beaucoup de personnes penseront à un exo du style on écrit directement le caractère dans l'application. 
                    Mais, outre le fait que c'est beaucoup plus complexe à mettre en place et pas forcément fiable, c'est bien mieux de s'habituer à les écrire à la main avec un stylo, ne serait-ce que pour le contrôle. 
                    Une des façons les plus efficaces de retenir les caractères est de les écrire tout le temps. 
                    Au moins un peu tous les jours d'ici le devoir.
                </p>
                <br>
                <p>
                    <b>Pinyin : </b>Le caractère ou le mot est affiché et vous devez écrire le pinyin directement, avec le bon ton au bon endroit :)
                    La partie entraînement Pinyin des caractères est prête mais je dois encore terminer la partie Pinyin pour les mots de vocabulaire, qui est un peu plus complexe à gérer.
                </p>
                <br>
                <div class="separation"></div>
                <br>
                <p>
                    Je prévois d'ajouter par la suite de pouvoir trier les caractères par clé. 
                    Pratique pour les exos demandant justement d'écrire tous les caractères selon une clé particulière.
                    <br>
                    J'aimerais bien intégrer les points de grammaire également.
                    <br>
                    À l'étude aussi : une animation pour l'ordre des traits des caractères (pourrait potentiellement prendre un temps fou à mettre en place).
                    <br>
                    Si vous avez des idées pour améliorer l'appli, ou encore avoir des types d'entraînement supplémentaires n'hésitez pas.
                </p>
                <br>
                <div class="separation"></div>
                <br>
                <p>
                    Je me suis concentré surtout sur la version smartphone, car c'est principalement comme ça qu'elle sera utilisée. 
                    La version ordinateur n'est quasiment pas fonctionnelle pour le moment, mais ça viendra. 
                    Selon les smartphones l'affichage peut être un peu différent aussi, prévenez moi si vous avez des soucis d'affichage, des textes qui dépassent à endroits improbables ou tout autre bug.
                </p>
                <br>
                <p>
                    Voilà. J'espère que ça vous plaira. Je fais ça sur mon temps libre dans un temps limité donc soyez indulgents ^^
                </p>
            </div>
        </div>
    `;

    bModalHelp = true;
    body.classList.add("no-scroll");
    editClass(modal_help, "fadeIn",true);
    modal_help.style.zIndex = 10;
}

function closeModalHelp() {
    popup_help.innerHTML = "";
    modal_help.classList.remove("fadeIn");
    if (bModalHelp) {
        body.classList.remove("no-scroll");
        bModalHelp = false;
    }
}

modal.addEventListener("transitionend", e => {
    if (bModal) {
        modal.style.zIndex = 10;
    } else {
        modal.style.zIndex = -10;
    }
})
modal_help.addEventListener("transitionend", e => {
    if (bModalHelp) {
        modal_help.style.zIndex = 10;
    } else {
        modal_help.style.zIndex = -10;
    }
})

function editClass(e, pClass, pAdd = true) {
    if (pAdd) {
        e.classList.add(pClass);
    } else {
        e.classList.remove(pClass);
    }
}

function emptyInput() {
    let inputList = document.querySelectorAll("input");
    inputList.forEach(i => {
        i.value = "";
    });
}
function id(pId) {
    return document.getElementById(pId);
}
function none(element) {
    element.style.display = "none";
}
function flex(element) {
    element.style.display = "flex";
}
function block(element) {
    element.style.display = "block";
}
function rnd(pMin, pMax) { //? pMax NON COMPRIS
    return Math.floor(Math.random() * (pMax - pMin)) + pMin;
}
function firstLetterUppercase(pString) {
    if (pString != "") {
        if (pString[0] == "(") {
            return pString[0] + pString[1].toUpperCase() + pString.slice(2);
        } else {
            return pString[0].toUpperCase() + pString.slice(1);
        }
    }
    return "";
}
function cleanPinyin(pPinyin) {
    let a = "āáǎà";
    let i = "īíǐì";
    let u = "ūúǔùǖǘǚǜ";
    let e = "ēéěè";
    let o = "ōóǒò";
    let cleanedPinyin = "";
    
    for (let j = 0; j < pPinyin.length; j++) {
        if (a.includes(pPinyin[j])) {
            cleanedPinyin += "a";
        } else if (i.includes(pPinyin[j])) {
            cleanedPinyin += "i";
        } else if (u.includes(pPinyin[j])) {
            cleanedPinyin += "u";
        } else if (e.includes(pPinyin[j])) {
            cleanedPinyin += "e";
        } else if (o.includes(pPinyin[j])) {
            cleanedPinyin += "o";
        } else {
            cleanedPinyin += pPinyin[j];
        }
    }
    return cleanedPinyin;
}

window.addEventListener("keypress", key => {
    if (key.code == "Enter") {
        // key.preventDefault();
    }
});