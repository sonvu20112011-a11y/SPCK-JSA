const App = {
    games: [
        {
            id: 1,
            name: "Shadow Chronicles",
            tag: "Hành động / Nhập vai",
            price: 199000,
            image: "shadow_chronicles.png",
            publisher: "NovaPlay Studios",
            rating: 4.8,
            desc: "Bước vào thế giới rộng lớn của Aethel, nơi ranh giới giữa ánh sáng và bóng tối mờ dần. Một siêu phẩm hành động nhập vai không thể bỏ lỡ.",
            config: ["HĐH: Windows 10", "CPU: Intel i5", "RAM: 8GB", "Đồ họa: GTX 1060"]
        },
        {
            id: 2,
            name: "Cyber Neon 2077",
            tag: "Khoa học viễn tưởng",
            price: 299000,
            image: "cyber_neon_2077.png",
            publisher: "NovaPlay Studios",
            rating: 4.5,
            desc: "Khám phá thành phố tương lai rực rỡ sắc màu Neon. Nơi công nghệ tối tân đối đầu với những âm mưu đen tối nhất.",
            config: ["HĐH: Windows 11", "CPU: Intel i7", "RAM: 16GB", "Đồ họa: RTX 3060"]
        },
        {
            id: 3,
            name: "Elden Mythos",
            tag: "Thế giới mở",
            price: 499000,
            image: "elden_mythos.png", 
            publisher: "NovaPlay Studios",
            rating: 5.0,
            desc: "Đối mặt với những vị thần cổ đại và giành lấy ngai vàng trong một thế giới mở rộng lớn đầy rẫy hiểm nguy.",
            config: ["HĐH: Windows 10", "CPU: i5 10th Gen", "RAM: 12GB", "Đồ họa: GTX 1660 Ti"]
        }
    ],

    // 2. KHỞI TẠO ỨNG DỤNG
    init() {
        console.log("App đang khởi chạy...");
        this.renderHomeGrid(this.games);
        this.setupEventListeners();
    },

    // 3. HIỂN THỊ DANH SÁCH GAME LÊN TRANG CHỦ
    renderHomeGrid(data) {
        const grid = document.getElementById('gameGrid');
        if (!grid) return;

        grid.innerHTML = data.map(game => `
            <div class="game-card bg-gray-800/50 rounded-3xl overflow-hidden border border-gray-700 transition cursor-pointer" 
                 onclick="App.showDetailPage(${game.id})">
                <img src="${game.image}" class="h-56 w-full object-cover" alt="${game.name}">
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

    // 4. LOGIC TÌM KIẾM
    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.toLowerCase().trim();
        
        const filteredGames = this.games.filter(game => 
            game.name.toLowerCase().includes(query) || 
            game.tag.toLowerCase().includes(query)
        );
        
        this.renderHomeGrid(filteredGames);
    },

    // 5. ĐIỀU HƯỚNG TRANG (Chuyển đổi giữa các màn hình)
    showPage(pageId) {
        // Ẩn tất cả các trang
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        
        // Hiện trang được chọn
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo(0, 0); // Cuộn lên đầu trang
        }
    },

    // 6. HIỂN THỊ CHI TIẾT GAME
    showDetailPage(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;

        this.currentGame = game; // Lưu lại game đang xem để xử lý nút "Mua"

        // Cập nhật nội dung trang chi tiết
        document.getElementById('detailImage').src = game.image;
        document.getElementById('detailTitle').textContent = game.name;
        document.getElementById('detailPublisher').textContent = `Nhà phát hành: ${game.publisher}`;
        document.getElementById('detailTag').textContent = game.tag;
        document.getElementById('detailDesc').textContent = game.desc;
        document.getElementById('detailPrice').textContent = `${game.price.toLocaleString('vi-VN')}đ`;
        
        // Cập nhật cấu hình
        const configList = document.getElementById('detailConfig');
        configList.innerHTML = game.config.map(item => `<li>• ${item}</li>`).join('');

        this.showPage('detailPage');
    },

    // 7. XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ
    handleLogin(event) {
        event.preventDefault();
        // Giả lập kiểm tra tài khoản (bạn có thể đổi theo ý muốn)
        const user = document.getElementById('loginUser').value;
        const pass = document.getElementById('loginPass').value;

        if (user === "sonvu" && pass === "2011") {
            this.utils.showModal("Thành công", "Chào mừng bạn đã trở lại, Vũ Hoàng Sơn!");
            document.getElementById('userAuth').classList.remove('hidden');
            document.getElementById('navLoginBtn').classList.add('hidden');
            this.showPage('homePage');
        } else {
            this.utils.showModal("Lỗi", "Tài khoản hoặc mật khẩu không chính xác.");
        }
    },

    handleRegister(event) {
        event.preventDefault();
        this.utils.showModal("Thông báo", "Đăng ký thành công! Vui lòng đăng nhập.");
        this.showPage('loginPage');
    },

    // 8. CÁC HÀNH ĐỘNG TƯƠNG TÁC KHÁC
    handleBuy() {
        this.utils.showModal("Xác nhận", `Cảm ơn bạn đã mua ${this.currentGame.name}. Game đã được thêm vào kho!`);
    },

    // 9. CÔNG CỤ HỖ TRỢ (UTILS)
    utils: {
        showModal(title, message) {
            document.getElementById('mTitle').textContent = title;
            document.getElementById('mMsg').textContent = message;
            document.getElementById('modal').classList.replace('hidden', 'flex');
        },
        closeModal() {
            document.getElementById('modal').classList.replace('flex', 'hidden');
        }
    },

    // 10. THIẾT LẬP CÁC SỰ KIỆN LẮNG NGHE (EVENT LISTENERS)
    setupEventListeners() {
        // Lắng nghe ô tìm kiếm
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.handleSearch());
        }
    }
};

// Đảm bảo Script chạy khi trang đã tải xong
window.onload = () => App.init();