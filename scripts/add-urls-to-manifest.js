const fs = require('fs');
const path = require('path');

// manifest.jsonのパス
const manifestPath = path.join(__dirname, '../public/iiif/3/main/manifest.json');

// manifest.jsonを読み込む
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// featuresにURLを追加
if (manifest.items && manifest.items[0] && manifest.items[0].annotations) {
  const annotationPage = manifest.items[0].annotations[0];

  if (annotationPage.items && annotationPage.items[0]) {
    const geoRefAnnotation = annotationPage.items[0];

    if (geoRefAnnotation.body && geoRefAnnotation.body.features) {
      const features = geoRefAnnotation.body.features;

      // 各featureのmetadataにurlを追加
      features.forEach(feature => {
        if (feature.metadata && feature.id) {
          // idからURLを生成（例: dm0001 -> https://static.toyobunko-lab.jp/daiminchiri/item/dm0001/）
          feature.metadata.url = `https://static.toyobunko-lab.jp/daiminchiri/item/${feature.id}/`;
        }
      });

      console.log(`Updated ${features.length} features with URLs`);
    }
  }
}

// 更新されたmanifest.jsonを保存
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Manifest file updated successfully!');
