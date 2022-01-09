import { NFTStorage } from 'https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js'
const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0QTFDOTZBRjA1N2JkNDZGOGM0OThlOTY2MjcyOTA2MjgzNDM1MGIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTM5MjIxMzI0OCwibmFtZSI6InNtYXJ0LnN0b25lIn0.uO9UTsdRDUnEcr5F54HTqkPUl2TetSH9HNX2Cf-TNJc";

function log(msg) {
    msg = JSON.stringify(msg, null, 2)
    document.getElementById('out').innerHTML += `${msg}\n`
}

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    document.getElementById('id_btn').disabled = 'disabled'
    document.getElementById('out').innerHTML = '请耐心等待...'
    const nameEl = document.getElementById('id_name')
    if (!nameEl.value) return log('标题不能为空')
    const descEl = document.getElementById('id_desc')
    if (!descEl.value) return log('描述不能为空')
    const fileEl = document.getElementById('id_file')
    if (!fileEl.files.length) return log('请选择文件')
    const storage = new NFTStorage({ token: NFT_STORAGE_KEY })
    try {
        const metadata = await storage.store({
            name: nameEl.value,
            description: descEl.value,
            image: fileEl.files[0],
        })
        document.getElementById('out').innerHTML = ''
        log({ '元数据（需要用的）': metadata.url })
        log({ '元数据内容': metadata.data })
        log({ '可直接浏览的数据': metadata.embed() })
    } catch (err) {
        console.error(err)
        log(err.message)
    }
    document.getElementById('id_btn').disabled = ''
})