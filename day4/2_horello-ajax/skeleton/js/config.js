"use strict";
window.horello = window.horello || {};

horello.apiKey = "bce9ff38e07c7c8245c0910d3ab9a728";
horello.apiToken = "ca4d0de9759cc55d5cb7d17d69dced21f76dc4c5d1f81662bfb4e449ea52c0db";
horello.apiUrl = "https://api.trello.com/1";
horello.boardId = "588a81be9b97817b76bb8f0f";

$.ajax('https://api.Trello.com/1/boards/"588a81be9b97817b76bb8f0f"', {
      data: {
        key: "bce9ff38e07c7c8245c0910d3ab9a728",
        token: "ca4d0de9759cc55d5cb7d17d69dced21f76dc4c5d1f81662bfb4e449ea52c0db",
      },
      success: function(data) { console.log(data) }
    })
