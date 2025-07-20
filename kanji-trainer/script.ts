interface KanjiDict {
    [key: string]: KanjiInfo
}

interface KanjiInfo {
    m: string,
    kun: string[],
    on: string[]
}

function createKanjiElement(kanji: string, info: KanjiInfo): HTMLElement {
    var a = document.createElement("a");
    a.className = "kanji";
    a.href = `https://thekanjimap.com/${kanji}`;
    a.target = "_blank";
    a.textContent = kanji;

    a.dataset.meaning = info.m;
    a.dataset.kun = info.kun.join(", ");
    a.dataset.on = info.on.join(", ");

    return a;
}

function createKanjiList(kanjiDict: KanjiDict, title: string): HTMLElement {
    var section = document.createElement("section");
    section.className = "kanji-table";

    var h2 = document.createElement("h2");
    h2.textContent = title;
    section.appendChild(h2);

    var br = document.createElement("br");
    section.appendChild(br);

    var div = document.createElement("div");
    div.className = "kanji-container";
    section.appendChild(div);

    Object.keys(kanjiDict).forEach(kanji => {
        var kanjiElement = createKanjiElement(kanji, kanjiDict[kanji]);
        div.appendChild(kanjiElement);
    });

    return section;
}

//------------------------------------[Kanji Table Generator]---------------------------------------
const main_container = document.querySelector("main");

for (let i = 0; i <= 20; i += 1) {
    let n = i * 100 + 1;
    let title = i == 20 ? "Jōyō Kanji 2001-2136" : `Jōyō Kanji ${n}-${n + 99}`;
    let kanjiListRaw = joyoKanji[i];
    // Filter out undefined values to conform to KanjiDict type
    let kanjiList: KanjiDict = Object.fromEntries(
        Object.entries(kanjiListRaw).filter(([_, v]) => v !== undefined)
    );
    let section = createKanjiList(kanjiList, title);
    main_container?.appendChild(section);
}

//---------------------------------------[Tooltip Handler]------------------------------------------
const tooltip = document.getElementById("tooltip") as HTMLElement;
const kanjiElements = document.querySelectorAll(".kanji");
kanjiElements.forEach(kanjiElement => {
    kanjiElement.addEventListener("mouseenter", (e) => {
        const title = kanjiElement.textContent;
        const meaning = kanjiElement.getAttribute("data-meaning");
        const kun = kanjiElement.getAttribute("data-kun");
        const on = kanjiElement.getAttribute("data-on");
        tooltip.querySelector(".tooltip-title")!.textContent = title;
        tooltip.querySelector(".tooltip-meaning")!.textContent = meaning;
        tooltip.querySelector(".tooltip-kun")!.textContent = kun;
        tooltip.querySelector(".tooltip-on")!.textContent = on;
        tooltip.style.display = "block";
    });

    kanjiElement.addEventListener("mousemove", (e: Event) => {
        let me = e as MouseEvent;
        const margin = 10;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const screenWidth = window.innerWidth + window.scrollX;
        const screenHeight = window.innerHeight + window.scrollY;

        let x = me.pageX + 10;
        let y = me.pageY + 10;

        // Right collision:
        if (x + tooltipWidth + margin > screenWidth) {
            x = screenWidth - tooltipWidth - margin;
        }

        // Bottom collision:
        if (y + tooltipHeight + margin > screenHeight) {
            y = screenHeight - tooltipHeight - margin;
        }

        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
    });

    kanjiElement.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});