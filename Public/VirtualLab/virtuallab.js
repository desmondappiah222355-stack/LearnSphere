const projectileBtn = document.querySelector("#projectile-btn");
const labContainer = document.querySelector(".lab-container");
const backButton = document.querySelector("#button");

projectileBtn.addEventListener("click", () => {
        labContainer.innerHTML = `
    <div class="projectile-lab">
    <h2>Projectile Motion</h2>
    <div class="simulation-area">
    <div class="projectile-ball"></div>
    <div class="ground"></div>
    </div>
    <div class="controls">
    <label for="speed">Initial Velocity: <span id="speed-value">18 m/s</span></label>
    <input type="range" id="speed" min="5" max="200" value="18">
    <label for="angle">Launch Angle: <span id="angle-value">45°</span></label>
    <input type="range" id="angle" min="0" max="90" value="45">
    <div class="lab-buttons">
    <button id="launch-btn">Launch Projectile</button>
    <button id="reset-btn">Reset</button>
    </div>
    <div class="results">
    <div class="result-card">
        <h3>Maximum Height</h3>
        <p id="height-result">0 m</p>
    </div>
    <div class="result-card">
        <h3>Horizontal Range</h3>
        <p id="range-result">0 m</p>
    </div>
    <div class="result-card">
        <h3>Flight Time</h3>
        <p id="time-result">0 s</p>
    </div>
</div>
    
    </div>
    </div>
</div>
`;
const speedSlider = document.querySelector("#speed");
const angleSlider = document.querySelector("#angle");
const speedValue = document.querySelector("#speed-value");
const angleValue = document.querySelector("#angle-value");
const ball = document.querySelector(".projectile-ball");
const simulationArea = document.querySelector(".simulation-area");

speedSlider.addEventListener("input", () => {
    speedValue.textContent = speedSlider.value + " m/s";
});
angleSlider.addEventListener("input", () => {
    angleValue.textContent = angleSlider.value + "°"

})
function launchProjectile() {
const angleRadians = angleSlider.value * Math.PI / 180;
const initialSpeed = Number(speedSlider.value);
const horizontalVelocity = initialSpeed * Math.cos(angleRadians);
const verticalVelocity = initialSpeed * Math.sin(angleRadians);
const gravity = 9.8;
const maxHeight = (verticalVelocity **2) / (2 * gravity);
const flightTime = (2 * verticalVelocity) / gravity;
const range = horizontalVelocity * flightTime;
document.querySelector("#height-result").textContent =maxHeight.toFixed(2) + " m";
document.querySelector("#range-result").textContent = range.toFixed(2) + " m";
document.querySelector("#time-result").textContent = flightTime.toFixed(2) + " s";
const PPM = 5;
const areaWidth = simulationArea.clientWidth;
const areaHeight = simulationArea.clientHeight;
const scaleX = (areaWidth - 20) / range;
const scaleY = (areaHeight - 20) / maxHeight;
const scale = Math.min(scaleX, scaleY, PPM);
const finalX = range * scale;
const finalY = maxHeight * scale;
const frames = [];
for (let i = 0; i <= 100; i++) {
    const time = (i / 100) * flightTime;
    const x = horizontalVelocity * time;
    const y = verticalVelocity * time - 0.5 * gravity * time ** 2;
    frames.push({
        left: (x * scale) + "px",
        bottom: (y * scale) + "px"
    });
}
ball.animate(frames, {
    duration: flightTime * 1000,
    fill: "forwards",
    easing: "linear"
});
}
const launchBtn = document.querySelector("#launch-btn");
const resetBtn = document.querySelector("#reset-btn");
launchBtn.addEventListener("click", launchProjectile);
resetBtn.addEventListener("click", () => {
    ball.getAnimations().forEach(animation => {
        animation.cancel();
    });

    ball.style.left = "0px";
    ball.style.bottom = "0px";

    document.querySelector("#height-result").textContent = "0 m";
    document.querySelector("#range-result").textContent = "0 m";
    document.querySelector("#time-result").textContent = "0 s";
});
});

backButton.addEventListener("click", () => {
    window.location.href="../dashboard/dashboard.html";
});
