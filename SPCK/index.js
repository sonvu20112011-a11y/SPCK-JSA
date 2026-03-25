const App = {
    games: [
        { id: 1, name: "Shadow Chronicles", tag: "Hành động / Nhập vai", price: 199000, image: "shadow_chronicles.png", publisher: "NovaPlay Studios", rating: 4.8, desc: "Bước vào thế giới rộng lớn của Aethel, nơi ranh giới giữa ánh sáng và bóng tối mờ dần.", config: ["HĐH: Windows 10", "CPU: Intel i5", "RAM: 8GB", "Đồ họa: GTX 1060"] },
        { id: 2, name: "Cyber Neon 2077", tag: "Khoa học viễn tưởng", price: 299000, image: "cyber_neon_2077.png", publisher: "NovaPlay Studios", rating: 4.5, desc: "Khám phá thành phố tương lai rực rỡ sắc màu Neon.", config: ["HĐH: Windows 11", "CPU: Intel i7", "RAM: 16GB", "Đồ họa: RTX 3060"] },
        { id: 3, name: "Elden Mythos", tag: "Thế giới mở", price: 499000, image: "elden_mythos.png", publisher: "NovaPlay Studios", rating: 5.0, desc: "Đối mặt với những vị thần cổ đại và giành lấy ngai vàng.", config: ["HĐH: Windows 10", "CPU: i5 10th Gen", "RAM: 12GB", "Đồ họa: GTX 1660 Ti"] }
    ],

    init() {
        this.renderHomeGrid(this.games);
        this.setupEventListeners();
        this.checkLoginStatus();
    },

    renderHomeGrid(data) {
        const grid = document.getElementById('gameGrid');
        if (!grid) return;
        grid.innerHTML = data.map(game => `
            <div class="game-card bg-gray-800/50 rounded-3xl overflow-hidden border border-gray-700 transition cursor-pointer" onclick="App.showDetailPage(${game.id})">
                <img src="${game.image}" onerror="this.src='https://via.placeholder.com/400x250?text=Game+Image'" class="h-56 w-full object-cover">
                <div class="p-6">
                    <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest">${game.tag}</span>
                    <h3 class="text-2xl font-black text-white mt-1 mb-4">${game.name}</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-green-400 font-black text-xl">${game.price.toLocaleString('vi-VN')}đ</span>
                        <span class="text-yellow-400 text-xs font-bold">★ ${game.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    showPage(pageId) {
        document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) { targetPage.classList.add('active'); window.scrollTo(0, 0); }
    },

    showDetailPage(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;
        this.currentGame = game;
        document.getElementById('detailImage').src = game.image;
        document.getElementById('detailTitle').textContent = game.name;
        document.getElementById('detailPublisher').textContent = `Nhà phát hành: ${game.publisher}`;
        document.getElementById('detailTag').textContent = game.tag;
        document.getElementById('detailDesc').textContent = game.desc;
        document.getElementById('detailPrice').textContent = `${game.price.toLocaleString('vi-VN')}đ`;
        document.getElementById('detailConfig').innerHTML = game.config.map(item => `<li>• ${item}</li>`).join('');
        this.showPage('detailPage');
    },

    // --- FIX LỖI ĐĂNG KÝ ---
    handleRegister(event) {
        event.preventDefault();
        const user = document.getElementById('regUser').value.trim();
        const pass = document.getElementById('regPass').value.trim();

        if (!user || !pass) {
            this.utils.showModal("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        let users = JSON.parse(localStorage.getItem('gameUsers')) || [];
        if (users.some(u => u.username === user)) {
            this.utils.showModal("Lỗi", "Tài khoản đã tồn tại!");
            return;
        }

        users.push({ username: user, password: pass });
        localStorage.setItem('gameUsers', JSON.stringify(users));

        this.utils.showModal("Thành công", "Tạo tài khoản thành công! Hãy đăng nhập.");
        this.showPage('loginPage');
    },

    // --- FIX LỖI ĐĂNG NHẬP ---
    handleLogin(event) {
        event.preventDefault();
        const inputUser = document.getElementById('loginUser').value.trim();
        const inputPass = document.getElementById('loginPass').value.trim();

        if (inputUser === "sonvu" && inputPass === "2011") {
            this.loginSuccess("Vũ Hoàng Sơn");
            return;
        }

        let users = JSON.parse(localStorage.getItem('gameUsers')) || [];
        const userFound = users.find(u => u.username === inputUser && u.password === inputPass);

        if (userFound) {
            this.loginSuccess(userFound.username);
        } else {
            this.utils.showModal("Lỗi", "Sai tài khoản hoặc mật khẩu.");
        }
    },

    loginSuccess(name) {
        this.utils.showModal("Chào mừng", `Đăng nhập thành công! Chào ${name}.`);
        document.getElementById('userAuth').classList.remove('hidden');
        document.getElementById('navLoginBtn').classList.add('hidden');
        sessionStorage.setItem('isLoggedIn', 'true');
        this.showPage('homePage');
    },

    checkLoginStatus() {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            document.getElementById('userAuth').classList.remove('hidden');
            document.getElementById('navLoginBtn').classList.add('hidden');
        }
    },

    handleSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        const filteredGames = this.games.filter(game => game.name.toLowerCase().includes(query) || game.tag.toLowerCase().includes(query));
        this.renderHomeGrid(filteredGames);
    },

    handleBuy() { this.utils.showModal("Xác nhận", `Cảm ơn đã mua ${this.currentGame.name}!`); },

    utils: {
        showModal(title, message) {
            document.getElementById('mTitle').textContent = title;
            document.getElementById('mMsg').textContent = message;
            document.getElementById('modal').classList.replace('hidden', 'flex');
        },
        closeModal() { document.getElementById('modal').classList.replace('flex', 'hidden'); }
    },

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) { searchInput.addEventListener('input', () => this.handleSearch()); }
    }
};

window.onload = () => App.init();