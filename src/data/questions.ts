import { Question } from '../types';

export const questions: Question[] = [
   {
    id: 1,
    text: "القيمة النهائية الخارجة من البرنامج هي ؟",
    code: "let a = 7.6;\nlet b = 3.9;\nlet c = Math.round(a) * Math.floor(b);\nconsole.log(c);",
    options: ["21", "32", "28", "24"],
    correctAnswer: 3
},
{
        id: 2,
        text: "ما هو ناتج الكود التالي؟",
        code: "let n = 1;\nfor (let i = 2; i < 4; i++) {\n    n = n * i;\n}\nif (n > 8) {\n    console.log(n);\n} else {\n    console.log(n - 3);\n}",
        options: ["6", "3", "5", "0"],
        correctAnswer: 1
    },
    {
        id: 3,
        text: "ما هو ناتج الكود التالي؟",
        code: "let score = 90;\nlet degree;\n\nif (score < 85) {\n    degree = 'A';\n} else if (score > 90) {\n    degree = 'B';\n} else {\n    degree = 'C';\n}\nconsole.log(degree);",
        options: ["A", "B", "undefined", "C"],
        correctAnswer: 3
    },
    {
        id: 4,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 2;\n\nfor (let i = 0; i < 3; i++) {\n    a = a * 2;\n}\nconsole.log(a);",
        options: ["8", "32", "16","4"],
        correctAnswer: 2
    }, {
        id: 5,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 10;\nlet y = '5';\nconsole.log(x + y);",
        options: ["15", "105", "Error", "undefined"],
        correctAnswer: 1
    },
    {
        id: 6,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 10;\nlet y = '5';\nconsole.log(x - y);",
        options: ["5", "105", "NaN", "Error"],
        correctAnswer: 0
    },
    {
        id: 7,
        text: "ما هو ناتج الكود التالي؟",
        code: "function tech(total) {\n    let res = total / 5;\n    return res;\n}\n\nconsole.log(tech(150));",
        options: ["50", "155", "100", "30"],
        correctAnswer: 3
    },
    {
        id: 8,
        text: "ما هو ناتج الكود التالي؟",
        code: "let num = 7;\n\nnum += 3;\n\nif (num == 9) {\n    console.log('A');\n} else if (num >= 9) {\n    console.log('B');\n}",
        options: ["A", "10", "Nothing", "B"],
        correctAnswer: 3
    },{
        id: 9,
        text: "كم مرة سيتم طباعة كلمة 'Hi'؟",
        code: "for (let i = 0; i < 3; i++) {\n    console.log('Hi');\n}",
        options: ["3", "4", "0", "2"],
        correctAnswer: 0
    },
    {
        id: 10,
        text: "ما هو ناتج الكود التالي؟",
        code: "let f = 300;\nif (f > 750) {\n    f = f + 100;\n} else {\n    f = f * 2;\n    console.log(f);\n}",
        options: ["300", "600", "750", "100"],
        correctAnswer: 1
    },
    {
        id: 11,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 2;\na += 4;\na *= 2;\nif (a == 13) {\n    console.log('Red');\n} else {\n    console.log('Blue');\n}",
        options: ["Red", "13", "12", "Blue"],
        correctAnswer: 3
    },
    {
        id: 12,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = '2';\nfor (let i = 0; i < 5; i++) {\n    a = a + 1;\n}\nconsole.log('a');",
        options: ["7", "211111", "Error", "a"],
        correctAnswer: 3
    },
    {
        id: 13,
        text: "ما هو ناتج الكود التالي؟",
        code: "let nums = [2, 4, 6];\nlet sum = 0;\n\nfor(let i=0; i<nums.length; i++){\n sum += nums[i];\n}\nconsole.log(sum);",
        options: ["10", "12", "6", "0"],
        correctAnswer: 1
    },{
        id: 14,
        text: "ما هو ناتج الكود التالي؟",
        code: "function calc(total) {\n    let res = total / 4;\n    return res;\n}\nconsole.log(calc(100));",
        options: ["25", "40", "100", "20"],
        correctAnswer: 0
    },
    {
        id: 15,
        text: "ما هو ناتج الكود التالي؟",
        code: "let z = 3;\nfor (let i = 0; i < 2; i++) {\n    z = z * 3;\n}\nconsole.log(z);",
        options: ["9", "27", "6", "3"],
        correctAnswer: 1
    },
    {
        id: 16,
        text: "كم مرة سيطبع الكود كلمة 'Yes'؟",
        code: "let arr = [5, 3, 5, 2, 5];\nfor (let i = 0; i < arr.length; i++) {\n    if (arr[i] == 5) {\n        console.log('Yes');\n    }\n}",
        options: ["2", "3", "5", "1"],
        correctAnswer: 1
    },
    {
        id: 17,
        text: "ما هو ناتج الكود التالي؟ (الخدعة في الشرط)",
        code: "let age = 12;\nlet count = 4;\nif (count >= 4 || age == 20) {\n    console.log('Discount');\n}",
        options: ["Discount", "Nothing", "Error", "4"],
        correctAnswer: 0
    },
    {
        id: 18,
        text: "ما هو العنصر الذي ستتم طباعته؟",
        code: "let colors = ['Red', 'Green', 'Blue'];\nconsole.log(colors[2]);",
        options: ["Red", "Green", "Blue", "undefined"],
        correctAnswer: 2
    },
    {
        id: 19,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 10;\nlet b = 5;\n// b = 2;\nconsole.log(a + b);",
        options: ["12", "15", "10", "Error"],
        correctAnswer: 1
    },
    {
        id: 20,
        text: "ما هو ناتج الكود؟ (الجمع داخل الحلقة)",
        code: "let sum = 0;\nfor(let i=1; i<=3; i++){\n sum = sum + i;\n}\nconsole.log(sum);",
        options: ["3", "5", "6", "10"],
        correctAnswer: 2
    },
    {
        id: 21,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 10;\nlet y = '10';\nif (x === y) {\n    console.log('Equal');\n} else {\n    console.log('Not Equal');\n}",
        options: ["Equal", "Not Equal", "Error", "undefined"],
        correctAnswer: 1
    },
    {
        id: 22,
        text: "ما هو ناتج الكود التالي؟",
        code: "let num = 5.7;\nconsole.log(Math.floor(num));",
        options: ["5", "6", "5.7", "0"],
        correctAnswer: 0
    },
    {
        id: 23,
        text: "ما هو ناتج الكود التالي؟",
        code: "let txt = 'Coding';\nconsole.log(txt.length);",
        options: ["5", "6", "7", "0"],
        correctAnswer: 1
    },
    {
        id: 24,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 10;\nlet b = 3;\nconsole.log(a % b);",
        options: ["3.33", "1", "3", "0"],
        correctAnswer: 1
    },
    {
        id: 25,
        text: "كم مرة سيعمل هذا التكرار؟",
        code: "for (let i = 10; i > 5; i--) {\n    console.log(i);\n}",
        options: ["4", "5", "6", "10"],
        correctAnswer: 1
    },
    {
        id: 26,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 5;\nx++;\nx += 2;\nconsole.log(x);",
        options: ["7", "8", "6", "5"],
        correctAnswer: 1
    },
    {
        id: 27,
        text: "ما هو ناتج الكود التالي؟",
        code: "let arr = [10, 20];\narr.push(30);\nconsole.log(arr.length);",
        options: ["2", "3", "30", "Error"],
        correctAnswer: 1
    },
    {
        id: 28,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 'Hi';\nlet b = 5;\nconsole.log(a * b);",
        options: ["HiHiHiHiHi", "Hi5", "NaN", "Error"],
        correctAnswer: 2
    },
    {
        id: 29,
        text: "ما هو ناتج الكود التالي؟",
        code: "let i = 0;\nwhile (i < 3) {\n    i++;\n}\nconsole.log(i);",
        options: ["2", "3", "4", "0"],
        correctAnswer: 1
    },
    {
        id: 30,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 20;\nif (x > 10 && x < 15) {\n    console.log('Yes');\n} else {\n    console.log('No');\n}",
        options: ["Yes", "No", "Error", "20"],
        correctAnswer: 1
    },
    {
        id: 31,
        text: "ما هو ناتج الكود التالي؟",
        code: "function sum(x, y) {\n    return x + y;\n}\nconsole.log(sum(5, 5) + 5);",
        options: ["10", "15", "55", "5"],
        correctAnswer: 1
    },
    {
        id: 32,
        text: "ما هو ناتج الكود التالي؟",
        code: "let arr = ['A', 'B', 'C'];\nconsole.log(arr[3]);",
        options: ["C", "B", "undefined", "Error"],
        correctAnswer: 2
    },
    {
        id: 33,
        text: "ما هو ناتج الكود التالي؟",
        code: "let n = 2;\nfor(let i=0; i<3; i++){\n n = n + 1;\n}\nconsole.log(n);",
        options: ["4", "5", "6", "3"],
        correctAnswer: 1
    },
    {
        id: 34,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 10;\nlet b = '20';\nif (a < b) {\n    console.log('Smaller');\n} else {\n    console.log('Bigger');\n}",
        options: ["Smaller", "Bigger", "Error", "undefined"],
        correctAnswer: 0
    },
    {
        id: 35,
        text: "ما هو ناتج الكود التالي؟",
        code: "console.log(typeof 100);",
        options: ["string", "number", "integer", "float"],
        correctAnswer: 1
    },
    {
        id: 36,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 5;\nlet y = 2;\nconsole.log((x + y) * 2);",
        options: ["14", "9", "12", "7"],
        correctAnswer: 0
    },
    {
        id: 37,
        text: "ما هو ناتج الكود التالي؟",
        code: "let str = 'Hello World';\nconsole.log(str[0]);",
        options: ["H", "e", "Hello", "d"],
        correctAnswer: 0
    },
    {
        id: 38,
        text: "ما هو ناتج الكود التالي؟",
        code: "let a = 5;\nif (a != 5) {\n    console.log('A');\n} else {\n    console.log('B');\n}",
        options: ["A", "B", "AB", "Error"],
        correctAnswer: 1
    },
    {
        id: 39,
        text: "ما هو ناتج الكود التالي؟",
        code: "let arr = [1, 2, 3];\narr[1] = 10;\nconsole.log(arr[1]);",
        options: ["1", "2", "10", "3"],
        correctAnswer: 2
    },
    {
        id: 40,
        text: "ما هو ناتج الكود التالي؟",
        code: "let x = 10;\nfor (let i = 0; i < 2; i++) {\n    x = x - 2;\n}\nconsole.log(x);",
        options: ["8", "6", "4", "10"],
        correctAnswer: 1
    }

    

];

export const GOVERNORATES = [
    ' منشأة سلطان , المنوفية',
    'القاهرة',
    'الجيزة',
    'الإسكندرية',
    'الدقهلية',
    'الشرقية',
    'المنوفية',
    'القليوبية',
    'البحيرة',
    'الغربية',
    'بور سعيد',
    'دمياط',
    'الإسماعيلية',
    'السويس',
    'كفر الشيخ',
    'الفيوم',
    'بني سويف',
    'المنيا',
    'أسيوط',
    'سوهاج',
    'قنا',
    'الأقصر',
    'أسوان',
    'البحر الأحمر',
    'الوادي الجديد',
    'مطروح',
    'شمال سيناء',
    'جنوب سيناء'
];
