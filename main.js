const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 220, y: 320, width: 40, height: 40, color: "#0f0" };
let blocks = [];

function spawnBlock() {
    blocks.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 2 + Math.random() * 3,
        color: "#f00"
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move and draw blocks
    blocks.forEach(block => {
        block.y += block.speed;
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });

    // Collision detection
    blocks.forEach(block => {
        if (block.y + block.height > player.y &&
            block.x < player.x + player.width &&
            block.x + block.width > player.x) {
            alert("Game Over!");
            document.location.reload();
        }
    });

    // Remove off-screen blocks
    blocks = blocks.filter(block => block.y < canvas.height);

    requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.x -= 20;
    if (e.key === "ArrowRight") player.x += 20;
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
});

setInterval(spawnBlock, 1000);
update();
