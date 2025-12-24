// بيانات المحادثات المزيفة
const chats = [
    {
        id: 1,
        name: "سارة محمد",
        lastMessage: "مرحباً! كيف حالك؟",
        time: "10:01 ص",
        unread: 0,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        active: true
    },
    {
        id: 2,
        name: "أحمد خالد",
        lastMessage: "شكراً على المساعدة",
        time: "أمس",
        unread: 2,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        name: "فريق العمل",
        lastMessage: "الاجتماع غداً الساعة 10",
        time: "الجمعة",
        unread: 0,
        avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
        id: 4,
        name: "ليلى أحمد",
        lastMessage: "👍",
        time: "الخميس",
        unread: 0,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        id: 5,
        name: "محمد علي",
        lastMessage: "تم استلام الملف",
        time: "الأربعاء",
        unread: 1,
        avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    }
];

// البيانات الأولية للرسائل
const initialMessages = [
    { type: 'received', text: 'مرحباً! كيف حالك؟', time: '10:00 ص' },
    { type: 'sent', text: 'الحمد لله، أنا بخير. وأنتِ؟', time: '10:01 ص' },
    { type: 'received', text: 'بخير الحمد لله. هل انتهيت من المشروع؟', time: '10:02 ص' },
    { type: 'sent', text: 'نعم، سأرسله لك بعد قليل', time: '10:03 ص' }
];

// عرض المحادثات في الشريط الجانبي
function renderChats() {
    const chatList = document.getElementById('chatList');
    chatList.innerHTML = '';
    
    chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chat.active ? 'active' : ''}`;
        chatItem.dataset.id = chat.id;
        
        chatItem.innerHTML = `
            <div class="chat-avatar">
                <img src="${chat.avatar}" alt="${chat.name}">
            </div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-last-message">${chat.lastMessage}</div>
            </div>
            <div class="chat-time">${chat.time}</div>
        `;
        
        chatItem.addEventListener('click', () => switchChat(chat));
        chatList.appendChild(chatItem);
    });
}

// عرض الرسائل في منطقة المحادثة
function renderMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '<div class="message-date">اليوم</div>';
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${msg.text}</p>
                <span class="message-time">${msg.time}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
    });
    
    // التمرير إلى الأسفل
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// تبديل المحادثة
function switchChat(chat) {
    // تحديث رأس المحادثة
    document.querySelector('.contact-info h3').textContent = chat.name;
    document.querySelector('.contact-profile h3').textContent = chat.name;
    document.querySelector('.contact-pic img').src = chat.avatar;
    document.querySelector('.contact-profile img').src = chat.avatar;
    
    // إزالة النشاط من جميع المحادثات
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // إضافة النشاط للمحادثة المحددة
    document.querySelector(`.chat-item[data-id="${chat.id}"]`).classList.add('active');
    
    // في تطبيق حقيقي، هنا ستجلب الرسائل من الخادم
    renderMessages(initialMessages);
}

// إرسال رسالة جديدة
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    const newMessage = {
        type: 'sent',
        text: text,
        time: time
    };
    
    // إضافة الرسالة الجديدة
    initialMessages.push(newMessage);
    renderMessages(initialMessages);
    
    // محو حقل الإدخال
    input.value = '';
    
    // محاكاة الرد التلقائي بعد ثانيتين
    setTimeout(() => {
        const replies = [
            "شكراً لك!",
            "حسناً",
            "أتفهم ذلك",
            "ممتاز!",
            "سأرد عليك لاحقاً"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyTime = new Date(now.getTime() + 2000).toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        const replyMessage = {
            type: 'received',
            text: randomReply,
            time: replyTime
        };
        
        initialMessages.push(replyMessage);
        renderMessages(initialMessages);
        
        // تحديث آخر رسالة في قائمة المحادثات
        const activeChat = chats.find(chat => chat.active);
        if (activeChat) {
            activeChat.lastMessage = text;
            activeChat.time = "الآن";
            renderChats();
        }
    }, 2000);
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    // عرض المحادثات والرسائل الأولية
    renderChats();
    renderMessages(initialMessages);
    
    // إرسال الرسالة عند الضغط على زر الإرسال
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    
    // إرسال الرسالة عند الضغط على زر Enter
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // تبديل زر الميكروفون عند الكتابة
    const messageInput = document.getElementById('messageInput');
    const sendButtonIcon = document.querySelector('#sendButton i');
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') {
            sendButtonIcon.className = 'fas fa-paper-plane';
            sendButton.onclick = sendMessage;
        } else {
            sendButtonIcon.className = 'fas fa-microphone';
            sendButton.onclick = null;
        }
    });
    
    // فتح/إغلاق معلومات جهة الاتصال
    document.querySelector('.contact-info h3').addEventListener('click', () => {
        document.querySelector('.contact-info-panel').style.display = 'block';
    });
    
    document.querySelector('.close-info').addEventListener('click', () => {
        document.querySelector('.contact-info-panel').style.display = 'none';
    });
    
    // البحث في المحادثات
    document.querySelector('.search-container input').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const chatItems = document.querySelectorAll('.chat-item');
        
        chatItems.forEach(item => {
            const name = item.querySelector('.chat-name').textContent.toLowerCase();
            const message = item.querySelector('.chat-last-message').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || message.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

