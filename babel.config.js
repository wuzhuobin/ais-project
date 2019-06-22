module.exports =  {
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "ie": "11"
      },
    }],
    "react-app",
    "@babel/preset-react"
  ],
  "plugins": [
  	"@babel/plugin-proposal-class-properties"
  ]
}
