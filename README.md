# TETR.IO Attack Calculator

## A fan made attack calculator for the TETR.IO garbage system

Not affiliated with @o5k (osk) or TETR.IO

I learnt JavaScript just to make this so sorry if code is bad lol

### Accuracy

I extrapolated the formulas for the garbage based off of osk's attack table:

![osk's attack table](https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png)

#### Singles

[According to osk](https://discord.com/channels/673303546107658242/674421736162197515/787782034013159424) the formula for singles is

```js
Math.floor(Math.log1p(combo_level * 1.25))
```

#### General Attack Formula

Based off of the attack table, I extrapolated

```js
Math.floor(combo_level/(4/(B2B_level + base_attack))) + B2B_level + base_attack
```

#### B2B Levels

I couldn't find a general formula for the B2B chaining formula so i just went with [the one that osk said in discord](https://discord.com/channels/673303546107658242/674421736162197515/713419086486437960):

| Level | B2Bs     |
| ----- | -------- |
| 0     | 0        |
| 1     | 1-2      |
| 2     | 3-7      |
| 3     | 8-23     |
| 4     | 24-66    |
| 5     | 67-184   |
| 6     | 185-503  |
| 7     | 504-1369 |
| 8     | 1370+    |

Technically we don't actually know when level 8 ends but someones probably not going to get 1370+ B2Bs in a row anyways

### Issues and Suggestions

If you have any bug reports or suggestions [open an issue](https://github.com/awesomeplaya211/tetrio-attack-calculator/issues/new/choose)
