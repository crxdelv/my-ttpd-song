<p align="center"><a href="https://bit.ly/my-ttpd-song">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://my-ttpd-song.vercel.app/img/anthology.jpg" width="500">
    <img alt="" src="https://my-ttpd-song.vercel.app/img/standard.png" width="500">
  </picture>
</a></p>

<p align="center"><a href="https://my-ttpd-song.vercel.app"><img src="https://img.shields.io/badge/status-running-blue?style=for-the-badge&logo=vercel&labelColor=black" alt="status: running"></a></p>

### :book: Under the hood

To calculate which song, I used this implementation:

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

### :fallen_leaf: What's new? <kbd>v5</kbd>

#### Stages of Grief

There are currently 4 stages available. The fifth one is probably the **reputation (Taylor's Version)**.

- Stage 1: Denial &ndash; Standard
- Stage 2: Bargaining &ndash; *The Albatross*
- Stage 3: Anger &ndash; Anthology
- Stage 4: Depression &ndash; *The Bolter*

#### Positions

There are currently 17 positions available. It is determined by the formula `seed % positions.length`. Respectively arranged as:

1. Chairman
2. President
3. Vice President
4. Secretary
5. Poet
6. Artist
7. Mastermind
8. Speaker
9. Prophecy
10. Albatross
11. Alchemist
12. Doctor
13. Wise Man
14. Good Samaritan
15. Fearless Leader
16. Real Tough Kid
17. Good Neighbor

### :balance_scale: Disclaimer
**my-ttpd-song** hosts the image files with full attribution to their owners. All rights to the images are reserved.
