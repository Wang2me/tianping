let leftInput = '0'; // 初始化为0
let rightInput = '0'; // 初始化为0

function addToInput(side, value) {
    if (side === 'left') {
        // 如果当前值为0，清空输入
        if (leftInput === '0') {
            leftInput = ''; 
        }
        leftInput += value;
    } else {
        // 如果当前值为0，清空输入
        if (rightInput === '0') {
            rightInput = ''; 
        }
        rightInput += value;
    }
    updateDisplay();
    updateScale();
}

function clearInput(side) {
    if (side === 'left') {
        leftInput = '0'; // 清空时设为0
    } else {
        rightInput = '0'; // 清空时设为0
    }
    updateDisplay();
    updateScale();
}

function backspace(side) {
    if (side === 'left') {
        // 退格处理
        if (leftInput.length > 1) {
            leftInput = leftInput.slice(0, -1); // 去掉最后一个字符
        } else {
            leftInput = '0'; // 如果只剩一个字符，重置为0
        }
    } else {
        // 退格处理
        if (rightInput.length > 1) {
            rightInput = rightInput.slice(0, -1); // 去掉最后一个字符
        } else {
            rightInput = '0'; // 如果只剩一个字符，重置为0
        }
    }
    updateDisplay();
    updateScale();
}

function updateDisplay() {
    document.getElementById('leftValue').innerText = leftInput; // 更新左盘显示值
    document.getElementById('rightValue').innerText = rightInput; // 更新右盘显示值
}

function updateScale() {
    try {
        const leftValue = eval(leftInput);
        const rightValue = eval(rightInput);

        const scale = document.querySelector('.scale');

        // 计算倾斜角度并限制在0到30度之间
        let angle = Math.max(-30, Math.min(30, (rightValue - leftValue) * 10)); // 根据差值调整倾斜程度
        scale.style.transform = `rotate(${angle}deg)`; // 应用倾斜效果

        if (leftValue > rightValue) {
            document.getElementById('leftPan').style.transform = 'translateY(20px)';
            document.getElementById('rightPan').style.transform = 'translateY(0)';
        } else if (leftValue < rightValue) {
            document.getElementById('leftPan').style.transform = 'translateY(0)';
            document.getElementById('rightPan').style.transform = 'translateY(20px)';
        } else {
            document.getElementById('leftPan').style.transform = 'translateY(0)';
            document.getElementById('rightPan').style.transform = 'translateY(0)';
            scale.style.transform = 'rotate(0deg)'; // 当相等时重置倾斜
        }
    } catch (error) {
        //document.getElementById('leftValue').innerText = '错误'; // 显示错误信息
        //document.getElementById('rightValue').innerText = '错误'; // 显示错误信息
    }
}
