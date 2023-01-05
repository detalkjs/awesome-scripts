// 关键词垃圾信息过滤

// 请删改关键词
let words = ['SB', 'spam', '垃圾', 'test']

for (let i of words) {
  if ($data.content.indexOf(i) != -1) {
    $data.hide = true;
  }
}
