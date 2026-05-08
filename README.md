# 吴鑫 · 个人网站 部署指南

这是一个**纯静态**网站，所有功能都在浏览器端运行，不需要后端服务器。
按下面的步骤操作，**5 分钟内**网站就能上线。

---

## 🚀 部署到 GitHub Pages（推荐）

### 第一步：创建专属仓库

1. 登录 [GitHub](https://github.com/wx839)
2. 点击右上角 **+** → **New repository**
3. **仓库名必须填写**：`wx839.github.io`（**和你的用户名完全一致**，不能改）
4. 设为 **Public**（公开），其他选项默认
5. 点 **Create repository**

> ⚠️ 仓库名错了网站就开不出来。必须是 `用户名.github.io` 格式。

### 第二步：上传所有文件

**最简单的方式（网页上传）**：

1. 进入刚创建的仓库
2. 点 **uploading an existing file** 链接（或者拖拽到页面上）
3. 把这个 `website/` 文件夹里**所有内容**（不是文件夹本身，是里面的内容）拖进去：
   - `index.html`
   - `style.css`
   - `script.js`
   - `assets/` 整个文件夹
   - `README.md`
4. 下面 **Commit changes** 写 "initial commit"，点提交

**或者用 Git 命令行**：

```bash
cd website
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/wx839/wx839.github.io.git
git push -u origin main
```

### 第三步：等 1-2 分钟，访问网站

打开浏览器，访问：

```
https://wx839.github.io
```

🎉 **第一次部署可能需要 1-2 分钟生效**，看到 404 别慌，喝口水再刷新。

---

## ✅ 验证清单（部署完检查）

- [ ] 主页能正常打开
- [ ] 中英文切换按钮（右上角"EN/中"）能切换
- [ ] 视频缩略图正常显示
- [ ] 点击视频能正常播放
- [ ] 手机打开布局正常
- [ ] 简历 PDF 下载按钮可用

---

## 📝 后续修改流程

修改任何内容（新增项目、改文字、换照片等）：

1. 在本地编辑文件
2. 重新 push 到仓库（或者直接在 GitHub 网页上编辑）
3. 等 30 秒-1 分钟自动重新发布

---

## 📂 文件结构说明

```
website/
├── index.html          # 主页面结构 (中英文都在这里)
├── style.css           # 样式 (深色主题 + 青蓝高亮)
├── script.js           # 交互逻辑 (语言切换 + 视频懒加载)
├── README.md           # 这个文件
└── assets/
    ├── cv.pdf          # 你的简历 PDF
    ├── images/
    │   └── photo.jpg   # 个人照片
    ├── videos/         # 31 个压缩后的项目视频 (84MB)
    │   ├── go2-isaaclab-1.mp4
    │   ├── go2-mujoco-1.mp4
    │   ├── go2-real-1.mp4
    │   ├── parkour-train-1.mp4
    │   ├── parkour-real-1.mp4
    │   ├── g1-loco-sim-1.mp4
    │   ├── g1-loco-real-1.mp4   ← 这些是核心展示视频
    │   ├── g1-mimic-1.mp4
    │   ├── g1-teleop-1.mp4
    │   ├── g1-psi0-1.mp4
    │   └── g1-sonic-1.mp4
    └── thumbnails/     # 31 个视频封面图 (1.1MB)
```

---

## 🎨 常用修改速查

### 改个人邮箱

打开 `index.html`，搜索 `x-wu25@mails.tsinghua.edu.cn` 全部替换。

### 加 / 删项目视频

每个视频卡片是这样的格式：
```html
<div class="video-card" data-video="文件名.mp4" data-thumb="文件名.jpg"></div>
```

加一个就复制一行，改文件名。视频文件放到 `assets/videos/`，缩略图放到 `assets/thumbnails/`。

### 改主题色

打开 `style.css`，搜索 `--accent: #38BDF8;` 改成你想要的颜色。比如：
- 暖橙：`#FB923C`
- 翠绿：`#10B981`
- 紫色：`#A78BFA`

### 改默认语言

打开 `index.html`，找到 `<body class="lang-zh">`，改成 `lang-en` 即可英文优先。

---

## 🆘 遇到问题

### 视频不显示？
- 检查 `assets/videos/` 里文件名是否和 HTML 里的 `data-video` 属性完全一致（区分大小写）
- 检查 GitHub 是否完整上传了视频文件（GitHub 网页上传单文件 100MB 限制，本项目最大文件 < 10MB，正常）

### 网站打开是 404？
- 检查仓库名是不是 `wx839.github.io`（一字不差）
- 确认仓库设为 Public（公开）
- 进入仓库 Settings → Pages，看 source 是不是 "Deploy from a branch" + main / root

### 视频加载慢？
- 这套已经做了懒加载（滚到才加载）+ 视频压缩（H.264 720p）
- 总大小 84MB，正常网络下首屏秒开
- 如果用户在国外访问慢，可以考虑接 Cloudflare 加速（可选）

---

## 🌐 自定义域名（可选）

如果以后想用 `wuxin.com` 这类自己的域名替代 `wx839.github.io`：

1. 买域名（推荐 Namecheap / 阿里云）
2. 仓库 Settings → Pages → Custom domain，填你的域名
3. 在域名服务商那里加 CNAME 记录指向 `wx839.github.io`

---

## 📧 联系

网站做好了，链接发给目标公司 HR：
- 邮件签名加一行：`Portfolio: https://wx839.github.io`
- 简历末尾添加 GitHub Pages 链接
- 微信名片备注里写上

祝顺利上岸 🚀

---

*Built with ❤️ for robotics. Hosted on GitHub Pages, free forever.*
