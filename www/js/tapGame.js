//
//  tapGame.js
//  MonacaFirstApp
//
//  Created by Natsumo Ikeda on 2016/07/01.
//  Copyright 2017 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.
//

/******************************************************/

/******************************************************/

// mBaaSの初期化
var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
// タイマー設定
var countTimer = 13;
// タップ回数カウンター
var counter = 0;
// 「tapFlag」的のタップ可否設定
var tapFlag = false;

// 「Start」ボタン押下時の処理
function easyGame() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html("10秒");
    // タイマーリセット
    this.countTimer = 13;
    // タイマーを起動
    countTime(countTimer);
}





// 【mBaaS】データの保存
function saveScore(name, score) {
  // **********【問題１】名前とスコアを保存しよう！**********
  var GameScore = ncmb.DataStore("GameScore");
  var gameScore = new GameScore();
  gameScore.set("name", name);
  gameScore.set("score", score);
  gameScore.save()
    .then(function () {
      console.log("保存に成功しました。");
    })
    .catch(function (error) {
      console.log("保存に失敗しました。エラー:" + error);
    });








  // ********************************************************
}
// タイマー
function countTime(time) {
  if (counter >= 1) {
    this.tapFlag = false;

    imputName(this.countTimer);
  } else {
    if (time >= 0) {
      if (time >= 11) {
        this.tapFlag = false;
        $("#list-page p").html("０秒過ぎると失格です");
      } else if (time == 10) {
        this.tapFlag = true;
        $("#list-page p").html("スタート！");
      } else if (time >= 7) {
        this.tapFlag = true;
        $("#list-page p").html(String(time));
      } else {
        this.tapFlag = true;
        $("#list-page p").html("???");
      }
      this.countTimer -= 1;
      // １秒後にcountTime()を呼び出す
      setTimeout("countTime(countTimer)", 1000);
    } else {
      this.tapFlag = false;

      imputName(this.countTimer);
    }
  }
}



// 名前入力アラートの表示
function imputName(countTimer) {
  if (countTimer < 0) {
    $("#list-page p").html("失格です。");

    document.gameForm.start.disabled = false;
    document.gameForm.ranking.disabled = false;
  } else {
    // 入力アラートを表示
    var name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
      $("#list-page p").html("保存がキャンセルされました");
    } else {

      // スコアと入力した名前を保存
      saveScore(name, countTimer);
      $("#list-page p").html(name + "さんのスコアは" + String(countTimer) + "秒でした");
    }
    // ボタンの有効化
    document.gameForm.start.disabled = false;
    document.gameForm.ranking.disabled = false;
  }
}


// タップ数カウント
function tapCount() {
  if (tapFlag) {
    this.counter += 1;
  }
}
