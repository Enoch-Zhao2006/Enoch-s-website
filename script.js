// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取标题元素
    const header = document.querySelector('header h1');
    
    // 添加点击事件
    header.addEventListener('click', function() {
        alert('欢迎访问我的网页！');
    });
    
    // 获取当前时间并显示在页脚
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} 我的网页`;
    
    // 添加一个简单的动画效果
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transition = 'opacity 1s';
    
    setTimeout(() => {
        content.style.opacity = '1';
    }, 500);

    // 点赞功能
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    const likeIcon = document.querySelector('.like-icon');
    
    // 由于 GitHub Pages 是静态托管，点赞功能将使用 localStorage
    let likes = parseInt(localStorage.getItem('pageLikes')) || 0;
    likeCount.textContent = likes;
    
    // 检查用户是否已经点赞
    const hasLiked = localStorage.getItem('hasLiked') === 'true';
    if (hasLiked) {
        likeButton.disabled = true;
        likeButton.style.backgroundColor = '#95a5a6';
        likeIcon.textContent = '❤️';
    }
    
    // 添加点赞事件
    likeButton.addEventListener('click', function() {
        if (!hasLiked) {
            likes++;
            likeCount.textContent = likes;
            localStorage.setItem('pageLikes', likes);
            localStorage.setItem('hasLiked', 'true');
            
            // 更新按钮状态
            likeButton.disabled = true;
            likeButton.style.backgroundColor = '#95a5a6';
            likeIcon.textContent = '❤️';
            
            // 添加点赞动画
            likeIcon.style.animation = 'likeAnimation 0.5s ease';
            setTimeout(() => {
                likeIcon.style.animation = '';
            }, 500);
        }
    });

    // Comment functionality
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const commentsList = document.getElementById('commentsList');

    // Load comments from localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Display existing comments
    function displayComments() {
        commentsList.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <p>${comment.text}</p>
                <div class="comment-footer">
                    <div class="timestamp">${comment.timestamp}</div>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
            commentsList.appendChild(commentElement);
        });

        // Add delete event listeners
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                comments.splice(index, 1);
                localStorage.setItem('comments', JSON.stringify(comments));
                displayComments();
            });
        });
    }

    // Add new comment
    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const now = new Date();
            const timestamp = now.toLocaleString();
            
            comments.unshift({
                text: commentText,
                timestamp: timestamp
            });
            
            // Save to localStorage
            localStorage.setItem('comments', JSON.stringify(comments));
            
            // Clear input and update display
            commentInput.value = '';
            displayComments();
        }
    });

    // Display existing comments on page load
    displayComments();
}); 