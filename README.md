# RULEX Document page
## 源码构建
```bash
npm install
num run dev
num run build
```
## Docker 发布
```bash
bash ./build
```
## 操作说明
- 如何新建一个专题？

  直接在`src\.vuepress`目录下新建一个目录即可

- 如何新建一个文章？

  首先在专题下面新建markdown文本，然后在 `config.js` 里面配好路径:
  ```js
      '/quickstart/': [
      {
        title: "快速开始",
        collapsable: false,
        children: [
          '/quickstart/cli.html',
        ]
      },
    ],
  ```
- 如何设置标题?

   在markdown文档加上特殊标识`title`即可
    ```
    ---
    title: 物联网网关
    ---
    ```