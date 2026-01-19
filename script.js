// 从URL参数获取箱子唯一标识
const urlParams = new URLSearchParams(window.location.search);
const boxId = urlParams.get('box'); // 格式如：001-001

// 预设密码（建议定期更换）
const CORRECT_PASSWORD = 'yourpassword123'; // 请修改为您的密码

// 更新箱子信息显示
if (boxId) {
    const parts = boxId.split('-');
    if (parts.length === 2) {
        document.getElementById('boxInfo').textContent = 
            `批次：${parts[0]} | 箱号：${parts[1]}`;
    }
}

// 检查密码
function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (!inputPassword) {
        errorMsg.textContent = '请输入密码';
        errorMsg.style.display = 'block';
        return;
    }
    
    if (inputPassword === CORRECT_PASSWORD) {
        // 密码正确，显示加载动画
        document.getElementById('passwordSection').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        errorMsg.style.display = 'none';
        
        // 加载对应箱子的装箱单图片
        loadPackingSlip();
    } else {
        // 密码错误
        errorMsg.textContent = '密码错误，请重新输入';
        errorMsg.style.display = 'block';
        // 清空密码框
        document.getElementById('password').value = '';
        // 重新聚焦到密码框
        document.getElementById('password').focus();
    }
}

// 加载装箱单图片
function loadPackingSlip() {
    if (!boxId) {
        document.getElementById('errorMsg').textContent = '箱子信息错误，请联系客服';
        document.getElementById('errorMsg').style.display = 'block';
        return;
    }
    
    // 构造图片路径：packing-slips/shipment-001/001-001.jpg
    const parts = boxId.split('-');
    const imagePath = `packing-slips/shipment-${parts[0]}/${boxId}.jpg`;
    
    const img = document.getElementById('packingImage');
    
    // 图片加载完成后的处理
    img.onload = function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('imageContainer').style.display = 'block';
    };
    
    // 图片加载失败的处理
    img.onerror = function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('errorMsg').textContent = '装箱单未找到，请联系客服';
        document.getElementById('errorMsg').style.display = 'block';
    };
    
    // 开始加载图片
    img.src = imagePath;
}

// 回车键提交密码
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// 自动聚焦到密码框
window.onload = function() {
    if (boxId) {
        document.getElementById('password').focus();
    } else {
        document.getElementById('errorMsg').textContent = '无效的二维码，请联系客服';
        document.getElementById('errorMsg').style.display = 'block';
    }
};
