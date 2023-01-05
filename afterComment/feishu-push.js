// 使用飞书 Webhook Bot 推送评论通知

(async () => {
  // 改成自己的 Webhook 地址
  let feishu_webhook = 'https://open.feishu.cn/open-apis/bot/v2/hook/********-****-****-****-************';

  let sitename = (await db.get('SITE_NAME')) || { value: '' };
  let sitelink = (await db.get('SITE_LINK')) || { value: '' };

  sitename = sitename.value;
  sitelink = sitelink.value;

  let feishu_msg = {
    "msg_type": "post",
    "content": {
      "post": {
        "zh_cn": {
          "title": `[${sitename}] 有新评论`,
          "content": [
              [{
                  "tag": "text",
                  "text": `在 [${sitename}] 中收到新消息！`
                },
              ],
              [
               {
                  "tag": "text",
                  "text": `评论者：${$data.nickname} (${$data.email})`
                },
              ],
              [
               {
                  "tag": "text",
                  "text": `评论内容：${$data.content}`
                },
              ],
              [
                {
                  "tag": "a",
                  "text": "点击此处查看详情",
                  "href": `${sitelink}${$id}`
                },
              ]
          ]
        }
      }
    }
  }
  
  let resp = await fetch(feishu_webhook, {
    method: "POST",
    body: JSON.stringify(feishu_msg),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json());
  
  if (resp.StatusCode == 0) {
    console.log('[Feishu] 发送成功');
  }
})();

