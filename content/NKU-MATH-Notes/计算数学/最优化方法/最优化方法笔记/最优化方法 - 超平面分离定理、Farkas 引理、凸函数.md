---
date: 2025-03-03
title: 最优化方法 - 超平面分离定理、Farkas 引理、凸函数
comments: true
---

## Farkas 引理

### 点与凸集的分离

设 $D$ 为非空的闭凸集，考虑
$$
H = \left\lbrace x\mid p^{\mathrm{T}}x=\alpha  \right\rbrace
$$
为超平面，如果 $H$ 分离了点 $y$ 和 $D$ ，说明若 $p^{\mathrm{T}}y>\alpha$ ，则 $p^{\mathrm{T}}x \leqslant \alpha$ . 换言之，令 $p^{\mathrm{T}}y-\alpha=\varepsilon$ ，可以表示
$$
p^{\mathrm{T}}y \geqslant  \varepsilon + p^{\mathrm{T}}x,\forall x\in S
$$
这就是下面定理的思想来源.

![](https://raw.githubusercontent.com/xiong-ZH-zq/My-PicGO-Img/main/blog/%E7%82%B9%E4%B8%8E%E5%87%B8%E9%9B%86%E5%88%86%E7%A6%BB%E5%AE%9A%E7%90%86.png)

>[!note] 定理：点与凸集分离定理
>设 $D$ 为 $\mathbb{R}^{n}$ 中非空闭凸集，$y\notin D$ ，则存在非零向量 $a\in \mathbb{R}^{n}$ 和实数 $\beta$ ，使得
> $$
> a^{\mathrm{T}}x \leqslant \beta < a^{\mathrm{T}}y, \forall x\in D
> $$

**定理证明**：根据上节的最佳逼近可得存在唯一的 $\overline{x}\in D$ 使得
$$
(x-\overline{x})^{\mathrm{T}}(\overline{x}-y) \geqslant 0, \forall x\in D
$$
即
$$
x^{\mathrm{T}}(y-\overline{x}) \leqslant \overline{x}^{\mathrm{T}}(y-\overline{x})
$$
由此可得
$$
\begin{aligned}
\|y-\overline{x}\|_{2}^{2} & = y^{\mathrm{T}}(y-\overline{x}) - \overline{x}^{\mathrm{T}}(y-\overline{x}) \\
& \leqslant y^{\mathrm{T}}(y-\overline{x}) - x^{\mathrm{T}}(y-\overline{x}) 
\end{aligned}
$$
记 $a = y-\overline{x}$ ，则
$$
0< \|a\|_{2}^{2} \leqslant (y-x)^{\mathrm{T}}a
$$
那么有
$$
a^{\mathrm{T}}x + \|a\|_{2}^{2}\leqslant a^{\mathrm{T}}y 
$$
记 $\beta = a^{\mathrm{T}}x+ \|a\|_{2}^{2}$ 即可. $\square$

### Farkas 引理

>[!note] 定理：Farkas 引理
>设 $A$ 为 $m\times n$ 矩阵，$b\in \mathbb{R}^{n}$ ，则下列两个不等式系统有且仅有一组有解：
> $$
> Ax \leqslant 0, b^{\mathrm{T}}x >0 
> $$
> 与
> $$
> A^{\mathrm{T}}y=b, y \geqslant 0
> $$

**证明**：假设两个都有解，则
$$
\begin{aligned}
y^{\mathrm{T}}Ax & = y^{\mathrm{T}}(Ax) \leqslant 0\\
& = (y^{\mathrm{T}}A)x = b^{\mathrm{T}}x >0
\end{aligned}
$$
这就出现了矛盾.

现在假设第二个系统无解，不难证明
$$
D = \left\lbrace z\mid\exists y \geqslant 0, z = A^{\mathrm{T}}y \right\rbrace
$$
是凸集，于是 $b\notin D$ ，因此根据点与凸集分离定理存在 $a$ 和 $\beta$ 使得
$$
a^{\mathrm{T}}z \leqslant  \beta < a^{\mathrm{T}}b, \forall z\in D
$$
于是
$$
\beta \geqslant a^{\mathrm{T}}A^{\mathrm{T}}y = (Aa)^{\mathrm{T}}y ,\forall y \geqslant 0
$$
这对任何一个 $y$ 都成立，这说明 $Aa \leqslant 0$ 是必须的，若存在某个分量为正，则令 $y$ 在该对应位置取到较大正值，可使得取值超过 $\beta$ . 

由于 $0\in D$ ，因此 $\beta \geqslant 0$ ，即有 $a^{\mathrm{T}}b>0$ ，因此 $a$ 为第一个系统的解. $\square$

Farkas 引理的几何意义非常明确，我们这个地方来说明一下为什么它非常直观.

首先我们来讨论第一个系统有解的几何意义：
$$
Ax \leqslant 0, b^{\mathrm{T}}x >0
$$
其中 $Ax \leqslant 0$ 表示 $x$ 与 $A$ 的所有**行向量**成大于等于直角，$x$ 与 $b$ 成锐角. 第二个系统则是
$$
A^{\mathrm{T}}y=b, y \geqslant 0
$$
其中 $A^{\mathrm{T}}y=b$ 表示 $b$ 是 $A^{\mathrm{T}}$ 当中**列向量**，即 $A$ 中**行向量**的线性组合，但是其中 $y \geqslant 0$ 表示 $b$ 必须在凸锥当中.

这里给出如下的解释：如果 $Ay$ 当中 $y \geqslant 0$ ，则 $\left\lbrace z\mid z=Ay,y \geqslant 0 \right\rbrace$ 构成一个凸锥，见下图，凸锥的边界由 $A$ 的**列向量**决定.

![](https://raw.githubusercontent.com/xiong-ZH-zq/My-PicGO-Img/main/blog/%E5%87%B8%E9%94%A5-2.png)

那么 Farkas 引理的几何意义就很明确了，我们看下图，简化到二维情形之后，实质上就是两种情形的讨论：

- $b$ 在 $A$ 行向量组成的凸锥之外；
- $b$ 在 $A$ 行向量组成的凸锥之内（包含边界）.

![](https://raw.githubusercontent.com/xiong-ZH-zq/My-PicGO-Img/main/blog/Farkas%20%E5%BC%95%E7%90%86%20-%202.png)

如果 $b$ 在凸锥外，则为左图，$x$ 可以和 $A$ 的行向量都保持钝角夹角，和 $b$ 保持锐角. 而对另一个系统，由于不在凸锥内，自然找不到 $y$ 使得 $b$ 为 $A$ 行向量的正线性组合.

如果 $b$ 在凸锥内，和左图的情况就是相反的.

## 超平面分离定理

### 支撑超平面

>[!note] 定义：支撑超平面
>设 $D$ 为非空集合，点 $\overline{x}\in \partial D$ ，若存在 $a\neq 0$ ，使得
>$$
> D \subseteq H_\overline{x}^{+} = \left\lbrace x\mid a^{\mathrm{T}}(x-\overline{x}) \geqslant 0 \right\rbrace
> $$
> 或
> $$
> D \subseteq H_{\overline{x}}^{-} = \left\lbrace x\mid a^{\mathrm{T}}(x-\overline{x}) \leqslant 0 \right\rbrace 
> $$
> 则称超平面 $H_{\overline{x}}=\left\lbrace x\mid a^{\mathrm{T}}(x-\overline{x})=0 \right\rbrace$ 是集合 $D$ 在 $\overline{x}$ 处的支撑超平面.

可以知道，凸集一定有支撑超平面，并且在任意的边界点处都有支撑超平面. 这就是我们接下来要证明的一个问题.

>[!note] 定理：凸集一定存在支撑超平面
> 设 $D$ 是非空凸集，$\overline{x}\in \partial D$ ，则存在非零向量 $a$ 使得
> $$
> a^{\mathrm{T}}x \leqslant a^{\mathrm{T}}\overline{x},\forall x\in \overline{D} 
> $$
> 这里 $\overline{D}$ 表示 $D$ 的闭包.

**证明**：由于 $\overline{x}\in \partial D$ ，则存在 $\left\lbrace y^{(k)} \right\rbrace$ 使得 $y^{(k)}\notin D$ 且 $y^{(k)}\to \overline{x}$ ，那么根据点与凸集的分离定理有
$$
(a^{(k)})^{\mathrm{T}} x \leqslant (a^{(k)})^{\mathrm{T}}y^{(k)}
$$
而 $\left\lbrace a^{(k)} \right\rbrace$ 显然有界，因此有收敛子列，不妨设就是本身收敛于 $a$ ，则 $k\to \infty$ 时
$$
a^{\mathrm{T}}x \leqslant a^{\mathrm{T}}\overline{x},\forall x\in \overline{D}
$$
于是结论成立. $\square$

根据证明过程，可以发现当 $\overline{x}\notin D$ 时结论均成立，那么用这个推论可以证明本节几乎最重要的一个定理.

### 超平面分离定理

>[!note] 定理：超平面分离定理
> 设 $D_{1},D_{2}$ 是两个非空凸集，且 $D_{1}\cap D_{2}=\varnothing$ ，则存在超平面分离 $D_{1},D_{2}$ ，即存在 $a\neq 0$ 使得
> $$
> a^{\mathrm{T}}x \leqslant a^{\mathrm{T}}y, \forall x\in \overline{D_{1}}, \forall y\in \overline{D_{2}} 
> $$

**证明**：设
$$
z\in D_{1}-D_{2} = \left\lbrace x-y\mid x\in D_{1},y\in D_{2} \right\rbrace
$$
 可以知道由于二者不交，有 $0\notin D_{1}-D_{2}$ ，故根据推论
$$
a^{\mathrm{T}}z \leqslant a^{\mathrm{T}}0,\forall z\in D_{1}-D_{2}
$$
从而
$$
a^{\mathrm{T}}x \leqslant a^{\mathrm{T}}y,\forall x\in D_{1},\forall y\in D_{2}
$$
最后对于闭包，只差边界上的极限点，直接利用点列取极限即可. $\square$


## Farkas 引理和 Gordan 引理及其应用

这里引入 Gordan 引理，我们不按照教材的方法进行证明而是转化为 Farkas 引理的形式利用 Farkas 引理证明.

>[!note] 定理：Gordan 引理
> 设 $A$ 为 $m\times n$ 矩阵，则下列两个不等式系统有且仅有一组有解：
> $$
> Ax<0 
> $$
> 以及
> $$
> A^{\mathrm{T}}y=0, y \geqslant 0, y\neq 0 
> $$

**证明**：设 $z > 0,v > 0$ 有
$$
Ax+ z \leqslant 0\Rightarrow \begin{pmatrix}A & I\end{pmatrix} \begin{pmatrix}x \\ z\end{pmatrix} \leqslant 0, \begin{pmatrix}0 & v^{\mathrm{T}}\end{pmatrix}\begin{pmatrix}x \\ z\end{pmatrix} >0
$$
同时
$$
\begin{pmatrix}A^{\mathrm{T}} \\ I\end{pmatrix}y =  \begin{pmatrix}0 \\ v\end{pmatrix}, y \geqslant 0
$$
从而利用 Farkas 引理即可. $\square$

这类问题只需要考虑几种可能的情况并转化为 Farkas 引理的形式即可.

> 第一个系统当中出现 $Bx=a$ 的等式形式.

首先我们要将其变成不等式，也就是
$$
\begin{cases}
Bx \leqslant a \\
Bx \geqslant a
\end{cases}
$$
然后考虑其中的 $a$ ，如果 $a=0$ 那自然很好，如果不是，则考虑
$$
\begin{pmatrix}B & I\end{pmatrix} \begin{pmatrix}x \\ a\end{pmatrix} \leqslant 0
$$
的形式，在 $a=0$ 的情况下，此时的如果写在一个不等式里就写为：
$$
\begin{pmatrix}B \\ -B\end{pmatrix}x \leqslant 0
$$

> 第一个系统中出现 $Bx <0$ 的严格不等式.

此时添加松弛变量即可：$z>0$ 使得
$$
Bx + z \leqslant 0\Rightarrow \begin{pmatrix}B & I\end{pmatrix} \begin{pmatrix}x \\ z\end{pmatrix} \leqslant 0
$$
> 第二个系统中出现不等式.

此时将与 $0$ 的差距设为变量即可，例如 $Ay \leqslant c$ ，则考虑设 $u = c-Ay$ ，有
$$
Ay +u =c \Rightarrow \begin{pmatrix}A & I\end{pmatrix} \begin{pmatrix}y \\ u\end{pmatrix} = c
$$

## 凸函数

### 凸函数定义

>[!note] 定义：凸函数
> 设 $f(x)$ 是定义在凸集 $D$ 上的函数，如对任意 $x,y\in D$ 和 $\alpha\in (0,1)$ ，有
> $$
> f(\lambda x + (1-\lambda)y) \leqslant \lambda f(x) + (1-\lambda) f(y) 
> $$
> 则称 $f(x)$ 是 $D$ 上的凸函数，如上述不等式对 $x\neq y$ 严格成立，则称 $f(x)$ 是 $D$ 上的严格凸函数.

需要注意的是，这里所说的“凸”是下凸函数. 除此之外和数学分析定义的无异.

>[!faq] 问题
> 如果 $\lambda$ 换成某个固定的数，可以吗？

不可以，但是这实际上是一个好问题，因为在 $\lambda = \dfrac{1}{2}$ 时，有一个专门的概念叫做“中点凸”，这种函数也有一些不错的性质.


### 凸函数的等价性质

>[!note] 定理：凸函数充要条件：单变量函数
> 函数 $f(x)$ 时 $\mathbb{R}^{n}$ 上的凸函数的充要条件是对于任意 $x,y$ ，单变量函数 $\psi(\alpha) = f(x+\alpha y)$ 是 $\alpha$ 的凸函数.


>[!note] 定理：凸函数充要条件：方向导数
> 设 $f: \mathbb{R}^{n}\to \mathbb{R}$ 是凸函数，则对任意 $x\in \mathbb{R}^{n}$ 及非零方向 $d,f$ 在 $x$ 点沿方向 $d$ 的方向导数存在.


