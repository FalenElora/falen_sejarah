const stages = [
    {
        name: "Stage 1: Australopithecus",
        task: "Kumpulkan 3 makanan, cari 1 pohon untuk berlindung",
        fact: "4-2 juta tahun lalu",
        stageText: "Australopithecus adalah manusia purba yang hidup sekitar 4 hingga 2 juta tahun lalu, merupakan pemakan segala yang lebih mengandalkan tumbuhan dan serangga kecil, serta berlindung di pohon atau gua. Mereka belum memiliki senjata buatan, mengandalkan tubuh mereka untuk bertahan hidup.",
        playerImg: "image/purba1.png",
        foodGoal: 1,
        food2Goal: 2,
        pohonGoal: 1,
        guaGoal: 0,
        rumahGoal: 0,
        rumahaGoal: 0,
        batuGoal: 0,
        tombakGoal: 0,
        panahGoal: 0,
        burungGoal: 0,
        mamutGoal: 0,
        bisonGoal: 0,
        apiGoal: 0
    },
    {
        name: "Stage 2: Homo Habilis",
        task: "Kumpulkan 2 makanan, cari 1 senjata, berburu 2 hewan kecil dan berlindung dibawah pohon",
        fact: "2,4-1,4 juta tahun lalu",
        stageText: "Homo habilis (2,4 hingga 1,4 juta tahun lalu) mulai mengonsumsi daging dan menggunakan alat batu kasar untuk berburu hewan kecil serta memotong daging. Mereka tinggal di gua dan bawah pohon, dengan senjata yang terbatas pada alat batu kasar.",
        playerImg: "image/purba2.png",
        foodGoal: 1,
        food2Goal: 1,
        pohonGoal: 1,
        guaGoal: 0,
        rumahGoal: 0,
        rumahaGoal: 0,
        batuGoal: 1,
        tombakGoal: 0,
        panahGoal: 0,
        burungGoal: 2,
        mamutGoal: 0,
        bisonGoal: 0,
        apiGoal: 0
    },
    {
        name: "Stage 3: Homo Erectus",
        task: "cari 1 senjata, berburu 3 hewan, berlindung di gua dan nyalakan api.",
        fact: "1,9 juta - 143.000 tahun lalu",
        stageText: "Homo erectus, yang muncul sekitar 1,9 juta hingga 143.000 tahun lalu, mengembangkan pola makan yang lebih beragam, termasuk daging hewan besar dan tumbuhan. Mereka berburu menggunakan alat yang lebih halus dan tombak, serta mulai menggunakan api untuk memasak dan bertahan dari pemangsa",
        playerImg: "image/purba3.png",
        foodGoal: 0,
        food2Goal: 0,
        pohonGoal: 0,
        guaGoal: 1,
        rumahGoal: 0,
        rumahaGoal: 0,
        batuGoal: 0,
        tombakGoal: 1,
        panahGoal: 0,
        burungGoal: 1,
        mamutGoal: 1,
        bisonGoal: 1,
        apiGoal: 1
    },
    {
        name: "Stage 4: Neanderthal",
        task: "kumpulkan 1 makanan, cari 1 senjata, buru 3 hewan, buat rumah dan cari api.",
        fact: "400.000 - 40.000 tahun lalu.",
        stageText: "Neanderthal adalah pemangsa daging yang ahli dan berburu hewan besar dengan senjata yang lebih canggih seperti tombak dan alat-alat batu. Mereka tinggal di gua atau membangun tempat berlindung sederhana. Mereka juga menggunakan api untuk kehangatan dan perlindungan.",
        playerImg: "image/purba4.png",
        foodGoal: 0,
        food2Goal: 1,
        pohonGoal: 0,
        guaGoal: 0,
        rumahGoal: 1,
        rumahaGoal: 0,
        batuGoal: 0,
        tombakGoal: 1,
        panahGoal: 0,
        burungGoal: 1,
        mamutGoal: 1,
        bisonGoal: 1,
        apiGoal: 1
    },
    {
        name: "Stage 5: Homo sapiens",
        task: "cari 2 senjata, buru 5 hewan, buat rumah dan cari api.",
        fact: "300.000 tahun lalu - sekarang",
        stageText: "Homo sapiens mengembangkan pola makan yang lebih beragam dan berburu dalam kelompok besar menggunakan berbagai senjata. Mereka mulai berternak dan mengembangkan pertanian. Tempat tinggal mereka lebih terorganisir dan permanen, dengan bahan yang lebih bervariasi seperti batu dan kayu, serta menciptakan senjata untuk pertanian dan perlindungan.",
        playerImg: "image/purba5.png",
        foodGoal: 0,
        food2Goal: 0,
        pohonGoal: 0,
        guaGoal: 0,
        rumahGoal: 0,
        rumahaGoal: 1,
        batuGoal: 0,
        tombakGoal: 1,
        panahGoal: 1,
        burungGoal: 1,
        mamutGoal: 2,
        bisonGoal: 2,
        apiGoal: 1
    }
];


let stage = 0;
let tasksCompleted = 0;
let playerX = 100;
let playerY = 100;
const playerSpeed = 10;

const playerElement = document.getElementById("player");
playerElement.style.position = "absolute";
playerElement.style.left = `${playerX}px`;
playerElement.style.top = `${playerY}px`;

const taskButton = document.getElementById("TaskButton");
const taskDisplay = document.getElementById("taskDisplay");
const factDisplay = document.getElementById("factDisplay");
const tasksCompletedDisplay = document.getElementById("tasksCompletedDisplay");

const gameArea = document.getElementById("gameArea");

let currentItem = null;

taskButton.addEventListener("click", () => {
    startStage();
});

function startStage() {
    if (stage >= stages.length) {
        alert("Permainan selesai! Semua tahap telah selesai.");
        window.location.href = 'quiz.html'; 
        return;
    }

    const currentStage = stages[stage];
    document.getElementById("stageDisplay").innerText = currentStage.name;
    taskDisplay.innerText = currentStage.task;
    factDisplay.innerText = currentStage.fact;
    playerElement.src = currentStage.playerImg;

    // Update teks stage
    const stageText = document.getElementById("stageText");
    stageText.innerText = currentStage.stageText; // Mengubah teks sesuai stage

    tasksCompleted = 0;
    updateTasksDisplay(currentStage);

    spawnItem();
}


function updateTasksDisplay(currentStage) {
    const totalTasks =
        (currentStage.foodGoal || 0) +
        (currentStage.food2Goal || 0) +
        (currentStage.pohonGoal || 0) +
        (currentStage.rumahGoal || 0) +
        (currentStage.rumahaGoal || 0) +
        (currentStage.batuGoal || 0) +
        (currentStage.tombakGoal || 0) +
        (currentStage.panahGoal || 0) +
        (currentStage.burungGoal || 0) +
        (currentStage.mamutGoal || 0) +
        (currentStage.bisonGoal || 0) +
        (currentStage.apiGoal || 0);
    tasksCompletedDisplay.innerText = `Tugas: ${tasksCompleted} / ${totalTasks}`;
}

function spawnItem() {
    const currentStage = stages[stage];

    if (currentItem) {
        currentItem.remove();
    }

    if (currentStage.foodGoal > 0) {
        currentItem = displayItem("food", "image/food1.png");
    } else if (currentStage.food2Goal > 0) {
        currentItem = displayItem("food2", "image/food2.png");
    } else if (currentStage.pohonGoal > 0) {
        currentItem = displayItem("pohon", "image/pohon.png");
    }else if (currentStage.guaGoal > 0) {
        currentItem = displayItem("gua", "image/gua.png");
    } else if (currentStage.rumahGoal > 0) {
        currentItem = displayItem("rumah", "image/rumah1.png");
    } else if (currentStage.rumahaGoal > 0) {
        currentItem = displayItem("rumaha", "image/rumah2.png");
    } else if (currentStage.batuGoal > 0) {
        currentItem = displayItem("batu", "image/senjata1.png");
    } else if (currentStage.tombakGoal > 0) {
        currentItem = displayItem("tombak", "image/tombak.png");
    } else if (currentStage.panahGoal > 0) {
        currentItem = displayItem("panah", "image/panah.png");
    } else if (currentStage.burungGoal > 0) {
        currentItem = displayItem("burung", "image/hewan1.png");
    } else if (currentStage.mamutGoal > 0) {
        currentItem = displayItem("mamut", "image/hewan2.png");
    } else if (currentStage.bisonGoal > 0) {
        currentItem = displayItem("bison", "image/hewan3.png");
    } else if (currentStage.apiGoal > 0) {
        currentItem = displayItem("api", "image/api.png");
    } 

    if (currentItem) {
        gameArea.appendChild(currentItem);
    }
}

function displayItem(type, src) {
    let item = document.createElement("img");
    item.src = src;
    item.alt = type;
    item.classList.add("item");

    const randomX = Math.random() * (gameArea.offsetWidth - 50);
    const randomY = Math.random() * (gameArea.offsetHeight - 50);

    item.style.position = "absolute";
    item.style.left = `${randomX}px`;
    item.style.top = `${randomY}px`;

    item.addEventListener("click", () => {
        collectItem(item);
    });

    return item;
}

function collectItem(item) {
    const currentStage = stages[stage];
    const itemType = item.alt;

    if (itemType === "food" && currentStage.foodGoal > 0) currentStage.foodGoal--;
    if (itemType === "food2" && currentStage.food2Goal > 0) currentStage.food2Goal--;
    if (itemType === "pohon" && currentStage.pohonGoal > 0) currentStage.pohonGoal--;
    if (itemType === "gua" && currentStage.guaGoal > 0) currentStage.guaGoal--;
    if (itemType === "rumah" && currentStage.rumahGoal > 0) currentStage.rumahGoal--;
    if (itemType === "rumaha" && currentStage.rumahaGoal > 0) currentStage.rumahaGoal--;
    if (itemType === "batu" && currentStage.batuGoal > 0) currentStage.batuGoal--;
    if (itemType === "tombak" && currentStage.tombakGoal > 0) currentStage.tombakGoal--;
    if (itemType === "panah" && currentStage.panahGoal > 0) currentStage.panahGoal--;
    if (itemType === "burung" && currentStage.burungGoal > 0) currentStage.burungGoal--;
    if (itemType === "mamut" && currentStage.mamutGoal > 0) currentStage.mamutGoal--;
    if (itemType === "bison" && currentStage.bisonGoal > 0) currentStage.bisonGoal--;
    if (itemType === "api" && currentStage.apiGoal > 0) currentStage.apiGoal--;

    item.remove();
    tasksCompleted++;
    updateTasksDisplay(currentStage);

    const totalTasksLeft =
        (currentStage.foodGoal || 0) +
        (currentStage.food2Goal || 0) +
        (currentStage.pohonGoal || 0) +
        (currentStage.guaGoal || 0) +
        (currentStage.rumahGoal || 0) +
        (currentStage.rumahaGoal || 0) +
        (currentStage.batuGoal || 0) +
        (currentStage.tombakGoal || 0) +
        (currentStage.panahGoal || 0) +
        (currentStage.burungGoal || 0) +
        (currentStage.mamutGoal || 0) +
        (currentStage.bisonGoal || 0) +
        (currentStage.apiGoal || 0);

    if (totalTasksLeft === 0) {
        alert("Tahap selesai! Lanjut ke tahap berikutnya.");
        stage++;
        startStage();
    } else {
        spawnItem();
    }
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            movePlayer("up");
            break;
        case "ArrowDown":
            movePlayer("down");
            break;
        case "ArrowLeft":
            movePlayer("left");
            break;
        case "ArrowRight":
            movePlayer("right");
            break;
    }
});

function movePlayer(direction) {
    switch (direction) {
        case "up":
            if (playerY - playerSpeed >= 0) playerY -= playerSpeed;
            break;
        case "down":
            if (playerY + playerSpeed <= gameArea.offsetHeight - 60) playerY += playerSpeed;
            break;
        case "left":
            if (playerX - playerSpeed >= 0) playerX -= playerSpeed;
            break;
        case "right":
            if (playerX + playerSpeed <= gameArea.offsetWidth - 60) playerX += playerSpeed;
            break;
    }

    playerElement.style.left = `${playerX}px`;
    playerElement.style.top = `${playerY}px`;

    checkItemProximity();
}

function checkItemProximity() {
    if (currentItem) {
        const playerRect = playerElement.getBoundingClientRect();
        const itemRect = currentItem.getBoundingClientRect();

        if (
            playerRect.left < itemRect.right &&
            playerRect.right > itemRect.left &&
            playerRect.top < itemRect.bottom &&
            playerRect.bottom > itemRect.top
        ) {
            collectItem(currentItem);
        }
    }
}


startStage();