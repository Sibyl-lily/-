// 检查登录状态
function checkLogin() {
    const token = localStorage.getItem('token')
    if(!token) {
        alert('请先登录')
        location.href = './login.html'
        return false
    }
    return true
}

// 获取用户信息
function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    
    axios.get(`http://localhost:8888/users/info/${userInfo.id}`, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
    .then(res => {
        if(res.data.code === 1) {
            const info = res.data.info
            document.getElementById('username').value = info.username
            document.getElementById('nickname').value = info.nickname
            document.getElementById('age').value = info.age || ''
            document.getElementById('gender').value = info.gender || '男'
        }
    })
    .catch(err => {
        if(err.response?.status === 401) {
            alert('登录已过期，请重新登录')
            location.href = './login.html'
        }
    })
}

// 保存用户信息
function saveUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const data = {
        id: userInfo.id,
        nickname: document.getElementById('nickname').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value
    }

    axios.post('http://localhost:8888/users/update', data, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
    .then(res => {
        if(res.data.code === 1) {
            alert('修改成功')
            getUserInfo()
        } else {
            alert(res.data.message)
        }
    })
    .catch(err => {
        if(err.response?.status === 401) {
            alert('登录已过期，请重新登录')
            location.href = './login.html'
        } else {
            alert('修改失败')
        }
    })
}

// 页面加载完成
window.onload = function() {
    if(checkLogin()) {
        getUserInfo()
    }
} 