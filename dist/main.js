/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("let data = {\r\n  searchHistory: [],\r\n  fetchedVideos: [],\r\n};\r\n\r\n(function init() {\r\n  showLoadingScreen();\r\n  window.onload = () => {\r\n    hideLoadingScreen();\r\n  };\r\n  let bar = document.querySelector(\"#searchBar\");\r\n  let btn = document.querySelector(\"#searchForVideos\");\r\n\r\n  checkForSearchHistory();\r\n  bar.addEventListener(\"focus\", showSearchHistory);\r\n  bar.addEventListener(\"blur\", hideSearchHistory);\r\n  btn.addEventListener(\"click\", searchForVideos);\r\n})();\r\n\r\nfunction saveSearchHistory() {\r\n  localStorage.setItem(\"searchHistory\", JSON.stringify(data.searchHistory));\r\n}\r\n\r\nfunction checkForSearchHistory() {\r\n  if (localStorage.getItem(\"searchHistory\") !== null) {\r\n    data.searchHistory = JSON.parse(localStorage.getItem(\"searchHistory\"));\r\n  }\r\n}\r\n\r\nfunction showSearchHistory() {\r\n  if (\r\n    data.searchHistory.length > 0 &&\r\n    document.querySelector(\"#searchBar\").value === \"\"\r\n  ) {\r\n    const searchHistoryBox = document.createElement(\"div\");\r\n    searchHistoryBox.id = \"searchHistoryBox\";\r\n    searchHistoryBox.className = \"empty\";\r\n\r\n    if (document.querySelector(\"#searchHistoryBox\") === null) {\r\n      document.querySelector(\"#searchBar\").className = \"fixCornersInput\";\r\n\r\n      setTimeout(() => {\r\n        document\r\n          .querySelector(\"#searchBarBox\")\r\n          .insertBefore(\r\n            searchHistoryBox,\r\n            document.querySelector(\"#searchBarBox select\")\r\n          );\r\n        let box = document.querySelector(\"#searchHistoryBox\");\r\n\r\n        setTimeout(() => {\r\n          box.className = \"fullSize\";\r\n          setTimeout(() => {\r\n            data.searchHistory.forEach((history) => {\r\n              box.innerHTML += `<div class=\"search\">${history}</div`;\r\n            });\r\n\r\n            document.querySelectorAll(\".search\").forEach((s) => {\r\n              s.className += \" visible\";\r\n              s.addEventListener(\"click\", updateSearchBarTerm);\r\n            });\r\n          }, 300);\r\n        }, 100);\r\n      }, 150);\r\n    }\r\n  }\r\n}\r\n\r\nfunction updateSearchBarTerm(e) {\r\n  document.querySelector(\"#searchBar\").value = e.target.textContent;\r\n}\r\n\r\nfunction hideSearchHistory() {\r\n  if (document.querySelector(\"#searchHistoryBox\") !== null) {\r\n    let box = document.querySelector(\"#searchHistoryBox\");\r\n    document\r\n      .querySelectorAll(\".search\")\r\n      .forEach((s) => (s.className += \" searchHidden\"));\r\n\r\n    setTimeout(() => {\r\n      box.innerHTML = \"\";\r\n      box.className = \"empty\";\r\n\r\n      setTimeout(() => {\r\n        box.style.border = \"none\";\r\n        box.style.padding = \"1px 15px\";\r\n\r\n        setTimeout(() => {\r\n          box.remove();\r\n          document.querySelector(\"#searchBar\").className = \"\";\r\n        }, 200);\r\n      }, 100);\r\n    }, 300);\r\n  }\r\n}\r\n\r\nfunction searchForVideos(e) {\r\n  let bar = document.querySelector(\"#searchBar\").value;\r\n  e.preventDefault();\r\n\r\n  if (bar !== \"\") {\r\n    const box = document.querySelector(\"#searchVideos\");\r\n    box.className = \"searchVideosFullSize\";\r\n\r\n    if (data.searchHistory.length === 3) {\r\n      let newSearchHistory = [];\r\n\r\n      data.searchHistory.push(bar);\r\n      for (let i = 1; i < data.searchHistory.length; i++) {\r\n        newSearchHistory.push(data.searchHistory[i]);\r\n      }\r\n\r\n      data.searchHistory = newSearchHistory;\r\n    } else {\r\n      data.searchHistory.push(bar);\r\n    }\r\n\r\n    saveSearchHistory();\r\n    determineVideosAPI();\r\n  }\r\n}\r\n\r\nfunction determineVideosAPI() {\r\n  const sel = document.querySelector(\"#searchVideosForm select\").value;\r\n  let searchTerm = document.querySelector(\"#searchBar\").value;\r\n\r\n  document.querySelector(\"#videosWrap\").innerHTML = \"\";\r\n  sel === \"YouTube\"\r\n    ? searchForYTVideos(searchTerm)\r\n    : searchForVimeoVideos(searchTerm);\r\n}\r\n\r\nasync function searchForYTVideos(searchTerm) {\r\n  showLoadingScreen();\r\n  document.querySelector(\"#videosWrap\").style.display = \"flex\";\r\n\r\n  let key = \"AIzaSyBdi6o7vIJpBcufoIc2ZQiIpNRfhS59FEw\";\r\n  let data = await fetch(\r\n    `https://youtube.googleapis.com/youtube/v3/search?&key=${key}&part=snippet&type=video&q=${searchTerm}&maxResults=12`\r\n  );\r\n  let fetched = await data.json();\r\n\r\n  await loadYTVideos(fetched);\r\n}\r\n\r\nfunction loadYTVideos(videos) {\r\n  data.fetchedVideos = videos.items;\r\n  videos.items.forEach((video) => {\r\n    document.querySelector(\r\n      \"#videosWrap\"\r\n    ).innerHTML += `<div data-id=\"${video.id.videoId}\" class=\"video\">\r\n                <img src=\"${video.snippet.thumbnails.medium.url}\" />\r\n                <div class=\"videoTitle\">${video.snippet.title}</div>\r\n             </div>`;\r\n  });\r\n\r\n  document\r\n    .querySelector(\"#searchVideos\")\r\n    .scrollIntoView({ behavior: \"smooth\" });\r\n\r\n  document.querySelectorAll(\".video\").forEach((vid) => {\r\n    vid.addEventListener(\"click\", (e) => previewVideo(e));\r\n  });\r\n  hideLoadingScreen();\r\n}\r\n\r\nfunction loadVimeoVideos(videos) {\r\n  data.fetchedVideos = videos.data;\r\n  videos.data.forEach((video) => {\r\n    document.querySelector(\"#videosWrap\").innerHTML += `<div data-id=\"${\r\n      video.uri.split(\"/\")[2]\r\n    }\" class=\"video\">\r\n                <img src=\"${video.pictures.sizes[3].link}\" />\r\n                <div class=\"videoTitle\">${video.name}</div>\r\n             </div>`;\r\n  });\r\n\r\n  document\r\n    .querySelector(\"#searchVideos\")\r\n    .scrollIntoView({ behavior: \"smooth\" });\r\n\r\n  document.querySelectorAll(\".video\").forEach((vid) => {\r\n    vid.addEventListener(\"click\", (e) => previewVideo(e));\r\n  });\r\n  hideLoadingScreen();\r\n}\r\n\r\nasync function searchForVimeoVideos(searchTerm) {\r\n  showLoadingScreen();\r\n  document.querySelector(\"#videosWrap\").style.display = \"flex\";\r\n\r\n  let data = await fetch(\r\n    `https://api.vimeo.com/videos?query=${searchTerm}?total=12&per_page=12`,\r\n    {\r\n      headers: {\r\n        Authorization:\r\n          \"basic N2M5YzI2NTVlNmM1NTVmZTJjNjdlMDYxMzNkYzYyMTVjZjJmOTcxNzpzRlFyUzNWMTBNUnpYTXkzR1A2enZGc0NkUWhFMHZpbUs1M1Bua0lLU3VPS3JxOG5QSGg0NmVpY1doeDBCd1owRC9yZ1IrbW9lVkgyaUFsUmUzNFJadEkrN1liVzRlMEVrVnJscHY1a2VFTUZGdTVmRitNUlUvQ20ydng0aXJnUQ==\",\r\n      },\r\n    }\r\n  );\r\n  let fetched = await data.json();\r\n\r\n  await loadVimeoVideos(fetched);\r\n}\r\n\r\nfunction showLoadingScreen() {\r\n  const box = document.createElement(\"div\");\r\n  box.id = \"loadingScreen\";\r\n\r\n  box.innerHTML = `<div id=\"round\"></div>`;\r\n  document.querySelector(\"#loadingScreen\") === null\r\n    ? document.body.appendChild(box)\r\n    : null;\r\n  document.body.className = \"hideScroll\";\r\n}\r\n\r\nfunction hideLoadingScreen() {\r\n  document.querySelector(\"#loadingScreen\") !== null\r\n    ? document.querySelector(\"#loadingScreen\").remove()\r\n    : null;\r\n  document.body.className = \"showScroll\";\r\n}\r\n\r\nfunction previewVideo(e) {\r\n  let previewedVideo = null;\r\n  const box = document.querySelector(\"#previewVideoBox\");\r\n\r\n  if (data.fetchedVideos[0].hasOwnProperty(\"id\")) {\r\n    previewedVideo = data.fetchedVideos.filter(\r\n      (vid) => vid.id.videoId === e.currentTarget.dataset.id\r\n    )[0];\r\n  } else {\r\n    previewedVideo = data.fetchedVideos.filter(\r\n      (vid) => vid.uri.split(\"/\")[2] === e.currentTarget.dataset.id\r\n    )[0];\r\n  }\r\n\r\n  document.querySelector(\"#searchVideos\").className = \"searchVideosEmpty\";\r\n  document.querySelector(\"#previewVideoBox\").className = \"fullPreviewVideoBox\";\r\n\r\n  loadPreviewVideo(previewedVideo);\r\n  if (document.querySelector(\".videoBtn\").dataset.eventListenerSet !== \"true\") {\r\n    console.log(\"hi\");\r\n    setButtons();\r\n  }\r\n}\r\n\r\nfunction loadPreviewVideo(video) {\r\n  if (video !== null) {\r\n    if (!video.hasOwnProperty(\"link\")) {\r\n      document.querySelector(\r\n        \"#previewVideoBox iframe\"\r\n      ).src = `https://www.youtube.com/embed/${video.id.videoId}`;\r\n      document.querySelector(\"#previewVideoBox iframe\").dataset.id =\r\n        video.id.videoId;\r\n      document.querySelector(\"#videoTitle h2\").textContent =\r\n        video.snippet.title;\r\n      document.querySelector(\"#videoDescription p\").textContent =\r\n        video.snippet.description;\r\n    } else {\r\n      document.querySelector(\"#videoBox\").innerHTML = video.embed.html;\r\n      document.querySelector(\"#previewVideoBox iframe\").dataset.id =\r\n        video.uri.split(\"/\")[2];\r\n      document.querySelector(\"#videoTitle h2\").textContent = video.name;\r\n      document.querySelector(\"#videoDescription p\").textContent =\r\n        video.description;\r\n    }\r\n  }\r\n\r\n  checkForArrowStatus(video);\r\n}\r\n\r\nfunction checkForArrowStatus(video) {\r\n  if (data.fetchedVideos.indexOf(video) === 0) {\r\n    if (\r\n      !document\r\n        .querySelectorAll(\".videoBtn\")[0]\r\n        .className.includes(\"disableBtn\")\r\n    ) {\r\n      document.querySelectorAll(\".videoBtn\")[0].className += \" disableBtn\";\r\n    }\r\n  } else if (\r\n    data.fetchedVideos.indexOf(video) ===\r\n    data.fetchedVideos.length - 1\r\n  ) {\r\n    if (\r\n      !document\r\n        .querySelectorAll(\".videoBtn\")[1]\r\n        .className.includes(\"disableBtn\")\r\n    ) {\r\n      document.querySelectorAll(\".videoBtn\")[1].className += \" disableBtn\";\r\n    }\r\n  } else {\r\n    if (\r\n      document\r\n        .querySelectorAll(\".videoBtn\")[0]\r\n        .className.includes(\"disableBtn\") ||\r\n      document.querySelectorAll(\".videoBtn\")[1].className.includes(\"disableBtn\")\r\n    ) {\r\n      document\r\n        .querySelectorAll(\".videoBtn\")\r\n        .forEach((btn) => (btn.className = \"videoBtn\"));\r\n    }\r\n  }\r\n}\r\n\r\nfunction setButtons() {\r\n  document\r\n    .querySelector(\"#videoInformation .btn\")\r\n    .addEventListener(\"click\", returnToSearchResults);\r\n  document.querySelectorAll(\".videoBtn\").forEach((btn) => {\r\n    btn.dataset.eventListenerSet = \"true\";\r\n    btn.addEventListener(\"click\", (e) => {\r\n      let video = null;\r\n      if (data.fetchedVideos[0].hasOwnProperty(\"id\")) {\r\n        video = data.fetchedVideos.filter(\r\n          (vid) =>\r\n            vid.id.videoId ===\r\n            document.querySelector(\"#videoBox iframe\").dataset.id\r\n        )[0];\r\n      } else {\r\n        video = data.fetchedVideos.filter(\r\n          (vid) =>\r\n            vid.uri.split(\"/\")[2] ===\r\n            document.querySelector(\"#videoBox iframe\").dataset.id\r\n        )[0];\r\n      }\r\n\r\n      changePreviewVideo(e, video);\r\n    });\r\n  });\r\n}\r\n\r\nfunction returnToSearchResults() {\r\n  document.querySelector(\"#previewVideoBox\").className = \"emptyPreviewVideoBox\";\r\n  document.querySelector(\"#searchVideos\").className = \"searchVideosFullSize\";\r\n  document.querySelector(\"#videoBox iframe\").src = \"\";\r\n\r\n  setTimeout(() => {\r\n    document\r\n      .querySelector(\"#searchVideos\")\r\n      .scrollIntoView({ behavior: \"smooth\" });\r\n  }, 300);\r\n}\r\n\r\nfunction changePreviewVideo(e, loadedVid) {\r\n  let determineVideo = null;\r\n  if (e.target.dataset.action === \"next\") {\r\n    if (data.fetchedVideos[0].hasOwnProperty(\"id\")) {\r\n      if (\r\n        data.fetchedVideos[\r\n          data.fetchedVideos.indexOf(\r\n            data.fetchedVideos.filter(\r\n              (vid) => vid.id.videoId === loadedVid.id.videoId\r\n            )[0]\r\n          ) + 1\r\n        ] !== undefined\r\n      ) {\r\n        determineVideo =\r\n          data.fetchedVideos[\r\n            data.fetchedVideos.indexOf(\r\n              data.fetchedVideos.filter(\r\n                (vid) => vid.id.videoId === loadedVid.id.videoId\r\n              )[0]\r\n            ) + 1\r\n          ];\r\n      }\r\n    } else {\r\n      if (\r\n        data.fetchedVideos[\r\n          data.fetchedVideos.indexOf(\r\n            data.fetchedVideos.filter(\r\n              (vid) => vid.uri.split(\"/\")[2] === loadedVid.uri.split(\"/\")[2]\r\n            )[0]\r\n          ) + 1\r\n        ] !== undefined\r\n      ) {\r\n        determineVideo =\r\n          data.fetchedVideos[\r\n            data.fetchedVideos.indexOf(\r\n              data.fetchedVideos.filter(\r\n                (vid) => vid.uri.split(\"/\")[2] === loadedVid.uri.split(\"/\")[2]\r\n              )[0]\r\n            ) + 1\r\n          ];\r\n      }\r\n    }\r\n  } else if (e.target.dataset.action === \"prev\") {\r\n    if (data.fetchedVideos[0].hasOwnProperty(\"id\")) {\r\n      if (\r\n        data.fetchedVideos.indexOf(\r\n          data.fetchedVideos.filter(\r\n            (vid) => vid.id.videoId === loadedVid.id.videoId\r\n          )[0]\r\n        ) -\r\n          1 >=\r\n        0\r\n      ) {\r\n        determineVideo =\r\n          data.fetchedVideos[\r\n            data.fetchedVideos.indexOf(\r\n              data.fetchedVideos.filter(\r\n                (vid) => vid.id.videoId === loadedVid.id.videoId\r\n              )[0]\r\n            ) - 1\r\n          ];\r\n      }\r\n    } else {\r\n      if (\r\n        data.fetchedVideos.indexOf(\r\n          data.fetchedVideos.filter(\r\n            (vid) => vid.uri.split(\"/\")[2] === loadedVid.uri.split(\"/\")[2]\r\n          )[0]\r\n        ) -\r\n          1 >=\r\n        0\r\n      ) {\r\n        determineVideo =\r\n          data.fetchedVideos[\r\n            data.fetchedVideos.indexOf(\r\n              data.fetchedVideos.filter(\r\n                (vid) => vid.uri.split(\"/\")[2] === loadedVid.uri.split(\"/\")[2]\r\n              )[0]\r\n            ) - 1\r\n          ];\r\n      }\r\n    }\r\n  }\r\n\r\n  showLoadingScreen();\r\n  loadPreviewVideo(determineVideo);\r\n  document.querySelector(\"#previewVideoBox iframe\").onload = () => {\r\n    hideLoadingScreen();\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack://video-finder/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;