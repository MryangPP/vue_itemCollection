const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { promisify } = require('util')

// 创建目录（如果不存在）
const mkdirAsync = promisify(fs.mkdir)
const IMG_COUNT = 64
const SAVE_DIR = './images'

// 生成下载 URL 的函数（保持原逻辑）
const getImageUrl = index => {
  const paddedIndex = index.toString().padStart(4, '0')
  return `https://www.apple.com.cn/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${paddedIndex}.png`
}

async function downloadImages() {
  try {
    // 创建保存目录
    await mkdirAsync(SAVE_DIR, { recursive: true })

    // 并发下载控制（每次 5 个并行下载）
    const concurrency = 5
    const indexes = Array.from({ length: IMG_COUNT }, (_, i) => i + 1)

    while (indexes.length) {
      const currentBatch = indexes.splice(0, concurrency)
      await Promise.all(
        currentBatch.map(async index => {
          const url = getImageUrl(index)
          const savePath = path.join(SAVE_DIR, `${index.toString().padStart(4, '0')}.png`)

          try {
            const response = await axios({
              url,
              method: 'GET',
              responseType: 'stream'
            })

            response.data.pipe(fs.createWriteStream(savePath))
            console.log(`Downloaded: ${index.toString().padStart(4, '0')}.png`)
          } catch (error) {
            console.error(`Failed to download ${index}: ${error.message}`)
          }
        })
      )
    }

    console.log('All downloads completed!')
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

// 执行下载
downloadImages()
