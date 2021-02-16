# Mine Sweeper Game
지뢰찾기 게임

## 게임 규칙
```
지뢰찾기는 보기와 달리 엄청 간단한 규칙을 가지고 있는 게임 입니다.

1.
게임 보드에 원하는 칸을 클릭 합니다.
그러면 선택한 칸 주변(3x3)에 지뢰가 몇개 있는지 칸에 표시해 줍니다.

1-2.
여기서 선택한 칸 주변에 지뢰가 한 개도 없다면,
인접해 있는 칸들을 열어서 주변에 있는 지뢰의 개수를 알려줍니다.

2.
우 클릭을 하면 깃발을 세울 수 있습니다.
이 칸에 지뢰가 있다는 의미로 게임 보드 안에 정해진 지뢰를 모두 찾는 것이 목표입니다.

3.
지뢰가 있는 칸을 클릭 하거나 지뢰를 지외한 모든 칸을 열면 게임이 종료됩니다.

* 마우스 좌+우 클릭을 동시에 하거나 마우스 휠을 클릭하면 해당 칸 주변(3x3)이 활성화 됩니다. 이를 화음(chord) 이라고 부릅니다.
** 우 클릭을 두번하면 물음표 표시를 할 수 있습니다. 이는 게임 내에서 아무런 영향을 끼치지 않으며 단순히 플레이어를 위한 기능입니다. (다시 한번 우 클릭 하면 표시를 지울 수 있습니다.)
```

## 난이도 (레벨 설정)
> 원작 게임인 **Microsoft Minesweeper** 에서 정한 난이도를 그대로 적용했습니다.
>
> 추가로 원하는 게임 보드의 크기와 지뢰의 개수를 사용자가 정할 수 있는 기능을 추가했습니다.

| Level         | Columns | Rows | Mines |
|---------------|---------|------|-------|
| Beginner      | 9       | 9    | 10    |
| Amateur       | 16      | 16   | 40    |
| Professional  | 30      | 16   | 99    |

## 개발자
- 개발자: 정예준 (yejun614@naver.com)
- 오리지널 게임: [Microsoft Minesweeper](https://en.wikipedia.org/wiki/Microsoft_Minesweeper)

## 리소스 저작권
- iconmonstr icons ([License](https://iconmonstr.com/license/))
- DIGITAL-7 Fonts (Sizenko Alexander, http://www.styleseven.com)
- Green plant color set ([in Adobe Color](https://color.adobe.com/ko/green%20plant-color-theme-13259804))

## 소스코드 저작권 (MIT License)
```
MIT License

Copyright (c) 2021 YeJun, Jung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## HTML5 Games Project
- **HTML5 Games Project** 는 추가 라이브러리 없이 HTML5 / CSS / JavaScript 를 이용해서 다양한 유형의 게임을 개발해 보는 챌린지 프로젝트 입니다.
- [Github Repository](https://github.com/yejun614/html5-games)
