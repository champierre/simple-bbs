# simple-bbs

simple-bbs は Google スプレッドシートをデータベースとして使う、GitHub Pages に配置した HTML ファイル1個だけで動く BBS です。

セキュリティは考慮にいれていません。用意したスプレッドシートはウェブアプリの URL 経由でだれでも編集できてしまいますし、その URL は隠蔽されてはいないので、ホビー用、テスト用にご利用ください。

## 設置方法

1. [テンプレートの Google スプレッドシート](https://docs.google.com/spreadsheets/d/1HXOEeYVHf1kZCWDVb4oqHFf7kNcAFikGSeqQaHQhFXI/edit?usp=sharing) をコピーします。

2. Google スプレッドシートのメニューより、[拡張機能] > [Apps Script] を選び、API の役割をする Google Apps Script を開きます。

3. [デプロイ] > [新しいデプロイ] を選び、「種類の選択」は「ウェブアプリ」が選ばれていることを確認して、「デプロイ」ボタンを押してデプロイします。

4. デプロイが完了したら、ウェブアプリの URL をコピーします。

5. このリポジトリを Fork します。

6. リポジトリの Settings > Secrets > Actions より New repository secret ボタンを押し、Name が ENDPOINT_URL、Secret には 4 でコピーした URL を入力します。

7. Settings > Pages を選び、Build and deployment の Source として GitHub Actions を選択します。

8. Actions で GitHub Pages にデプロイする GitHub Actions が進行していることを確認し、完了したら https://<ユーザー名>.github.io/<リポジトリ名>/ をブラウザで開いてください。
