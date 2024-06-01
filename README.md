<p align="center"><a href="https://bit.ly/my-ttpd-song">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://my-ttpd-song.vercel.app/img/anthology.jpg" width="500">
    <img alt="" src="https://my-ttpd-song.vercel.app/img/standard.png" width="500">
  </picture>
</a></p>

<p align="center"><a href="https://my-ttpd-song.vercel.app"><img src="https://img.shields.io/badge/status-running-blue?style=for-the-badge&logo=vercel&labelColor=black" alt="status: running"></a></p>

### :book: Under the hood

To calculate which song should be used, I used this implementation:

```js
function seed(raw) {
  let res = 0;
  raw.toUpperCase().trim().split("").forEach(char => {
    res += Math.round(char.charCodeAt(0) / 5);
    if(res > 30) res -= 31;
  });
  if(res > 30) res -= 31;
  return res;
}
```

This function iterates the given name by character and increment the variable `res` by the rounded value of its character code divided by 5.

Whenever the variable `res` exceeds the total tracks, it decreases by 31.

### :test_tube: Bulk name testing
For instant name testing, go to [/bulk-test](https://my-ttpd-song.vercel.app/bulk-test).

This includes the name informations, process, and the output.

### :balance_scale: Disclaimer
**my-ttpd-song** only host the image files and not the audio. It  relies on `PyTube` to play music.

For any DMCA requests of audio removal, please contact me.
