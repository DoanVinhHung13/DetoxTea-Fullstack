import phaTraImg from "../assets/images/home/anh2.jpg";
import matchaImg from "../assets/images/home/anh3.jpg";
import haGiangImg from "../assets/images/home/doi-che-co-thu-ha-giang.jpg";

export const newsArticles = [
  {
    id: 1,
    category: "HÀNH TRÌNH",
    title: "Trở về với những nương chè lặng lẽ Lâm Đồng",
    date: "15 Tháng 10, 2024",
    author: "Minh An",
    image: haGiangImg,
    slug: "tro-ve-voi-nhung-nuong-che-lang-le-lam-dong",
    content: `
      <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hành trình về những nương chè lặng lẽ Lâm Đồng</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        header {
            text-align: center;
            padding-bottom: 30px;
            border-bottom: 2px solid #2e7d32;
        }
        h1 {
            color: #2e7d32;
            font-size: 2.2em;
            margin-bottom: 10px;
        }
        .slogan {
            font-style: italic;
            color: #666;
        }
        h2 {
            color: #1b5e20;
            border-left: 5px solid #2e7d32;
            padding-left: 15px;
            margin-top: 30px;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        ul {
            list-style-type: none;
            padding-left: 20px;
        }
        ul li::before {
            content: "•";
            margin-right: 10px;
        }
        .highlight-box {
            background-color: #e8f5e9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
            margin: 20px 0;
        }
        .article-image {
            width: 100%;
            max-width: 800px;
            height: 420px;
            object-fit: cover;
            display: block;
            margin: 20px auto;
            border-radius: 8px;
        }
        footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-style: italic;
            text-align: center;
            color: #555;
        }
    </style>
</head>
<body>
    <main>
        <p>Giữa nhịp sống hiện đại đầy vội vã, có những vùng đất vẫn lặng lẽ giữ cho mình nhịp thở riêng. Những nương chè ở Lâm Đồng là một trong số đó - nơi những búp trà xanh từng “lỡ hẹn” với thị trường lại đang bắt đầu một câu chuyện mới.</p>

        <h2>Lâm Đồng - Thủ phủ chè của cao nguyên</h2>
        <img src="/images/lam-dong-thu-phu.png" class="article-image" />
        <p>Nằm trên cao nguyên mát lạnh quanh năm, Lâm Đồng từ lâu đã được xem là một trong những vùng trồng chè quan trọng nhất Việt Nam. Đặc biệt, khu vực <strong>Bảo Lộc</strong> nổi tiếng với những đồi chè trải dài, khí hậu ôn hòa, thổ nhưỡng màu mỡ và độ cao lý tưởng để cây chè phát triển bền bỉ.</p>
        <p>Chính sự chênh lệch nhiệt độ giữa ngày và đêm, cùng tầng đất bazan giàu khoáng, đã tạo nên những búp trà có hương thơm thanh, vị chát dịu và hậu ngọt sâu. Đây là nền tảng để những nương chè lâu năm giữ được chất lượng ổn định qua nhiều thế hệ.</p>

        <h2>Những búp trà “lỡ hẹn” và câu chuyện phía sau</h2>\
        <img src="/images/nhung-bup-tra-lo-hen.png" class="article-image" />
        <p>Trong thực tế sản xuất, không phải búp trà nào cũng được lựa chọn để xuất khẩu hay đưa vào các dòng sản phẩm thương mại cao cấp. Nhiều lứa chè “lệch chuẩn” về kích thước, màu sắc hay hình thức bên ngoài bị đánh giá thấp dù chất lượng hương vị vẫn đạt tiêu chuẩn.</p>
        <div class="highlight-box">
            <p>Những búp trà ấy không hề kém giá trị. Chúng chỉ đơn giản không phù hợp với tiêu chí thương mại khắt khe.</p>
        </div>
        <p>Trở về với những nương chè lặng lẽ ở Lâm Đồng là trở về với góc nhìn công bằng hơn: đánh giá trà bằng hương vị thực sự thay vì hình thức. Khi được chế biến đúng cách, những lá chè ấy vẫn mang đầy đủ vị thanh - thơm - đậm đặc trưng của vùng cao nguyên.</p>

        <h2>Hành trình tìm lại hương vị nguyên bản</h2>
        <img src="/images/hanh-trinh-tim-lai.png" class="article-image" />
        <p>Đi giữa đồi chè vào buổi sớm, khi sương còn đọng trên từng lá non, bạn sẽ cảm nhận được sự chậm rãi rất khác. Không còn áp lực về sản lượng hay chuẩn mực hình thức, người làm trà có thời gian lắng nghe cây chè, điều chỉnh cách hái, cách làm héo, cách sao, để giữ lại hương vị tự nhiên nhất.</p>
        
        <p>Hương trà từ Lâm Đồng thường có:</p>
        <ul>
            <li>Vị thanh nhẹ, không gắt</li>
            <li>Hương cỏ non và thoảng mùi hoa núi</li>
            <li>Hậu vị ngọt dịu kéo dài</li>
        </ul>


        <h2>Tử tế với đất - Tử tế với người uống</h2>
        <img src="/images/tu-te-voi-dat.png" class="article-image" />
        <p>Sự tử tế trong hành trình này không chỉ nằm ở cách chọn nguyên liệu mà còn ở cách kể lại câu chuyện của nó. Minh bạch nguồn gốc, tôn trọng giá trị thật của lá chè và tối giản can thiệp vào hương vị tự nhiên chính là hướng đi bền vững.</p>
        <p>Khi người tiêu dùng hiểu rằng <em>“lệch chuẩn ngoại hình”</em> không đồng nghĩa với <em>“kém chất lượng”</em>, giá trị của nông sản Việt được nhìn nhận đầy đủ hơn. Điều đó cũng góp phần giảm lãng phí nguyên liệu, hỗ trợ người nông dân và tạo nên một vòng tròn sản xuất bền vững.</p>

        <h2>Trải nghiệm yên bình giữa thiên nhiên</h2>
        <img src="/images/trai-nghiem-yen -binh.png" class="article-image" />
        <p>Không chỉ là câu chuyện sản phẩm, trở về với nương chè Lâm Đồng còn là hành trình trải nghiệm. Những đồi chè xanh mướt nối tiếp nhau, không khí mát lạnh, mùi trà thoảng trong gió - tất cả tạo nên một không gian chữa lành đúng nghĩa.</p>
        <p>Ở đó, mỗi tách trà không chỉ để uống. Đó là khoảng lặng để nhìn lại, để thở chậm hơn và để cảm nhận rõ hơn hương vị nguyên bản của thiên nhiên.</p>
    
        </main>

    <footer>
        <p>Hành trình tìm lại nguồn cội - Trả lại giá trị công bằng cho những búp trà bị bỏ quên.</p>
    </footer>

</body>
</html>`,
  },
  {
    id: 2,
    category: "VĂN HÓA",
    title: "Thưởng trà - Khoảnh khắc tĩnh lặng giữa nhịp sống hối hả",
    excerpt:
      "Nhấm nháp từng ngụm trà, cảm nhận hương thơm dịu dàng và hơi thở của lá trà. Những nghi thức giản đơn giúp ta chậm lại và tìm thấy bình yên.",
    image: phaTraImg,
    slug: "thuong-tra-khoanh-khac-tinh-lang-giua-nhip-song-hoi-ha",
    content: `
      <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thưởng trà - Khoảnh khắc tĩnh lặng giữa nhịp sống hối hả</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        header {
            text-align: center;
            padding-bottom: 30px;
            border-bottom: 2px solid #2e7d32;
        }
        h1 {
            color: #2e7d32;
            font-size: 2.2em;
            margin-bottom: 10px;
        }
        .slogan {
            font-style: italic;
            color: #666;
        }
        h2 {
            color: #1b5e20;
            border-left: 5px solid #2e7d32;
            padding-left: 15px;
            margin-top: 30px;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        ul {
            list-style-type: none;
            padding-left: 20px;
        }
        ul li::before {
            content: "•";
            margin-right: 10px;
        }
        .highlight-box {
            background-color: #e8f5e9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
            margin: 20px 0;
            font-style: italic;
        }
        .article-image {
            width: 100%;
            max-width: 800px;
            height: 420px;
            object-fit: cover;
            display: block;
            margin: 20px auto;
            border-radius: 8px;
        }
        footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-style: italic;
            text-align: center;
            color: #555;
        }
        strong {
            color: #2e7d32;
        }
    </style>
</head>
<body>
    <main>
        <p>Giữa dòng người vội vã và những nhịp sống gấp gáp mỗi ngày, có những khoảng lặng tưởng như rất nhỏ nhưng lại đủ sức làm dịu cả một ngày dài. <strong>Thưởng trà</strong> không chỉ là một thói quen, mà là một nghi thức nhẹ nhàng để ta trở về với chính mình. Khi nhấm nháp từng ngụm trà ấm, cảm nhận hương thơm dịu dàng lan tỏa, mọi chuyển động dường như chậm lại.</p>

        <h2>Khi một tách trà trở thành khoảng dừng cần thiết</h2>
        <img src="/images/khi-mot-tach-tra.png" class="article-image" />
        <p>Thưởng trà là hành trình của sự chú tâm. Từ lúc đun nước, chờ nhiệt độ vừa đủ, đến khi thả những lá trà vào ấm và đợi hương vị dần hé mở, mỗi bước đều đòi hỏi sự kiên nhẫn.</p>
        <p>Những nghi thức ấy nhắc ta về sự <strong>cân bằng</strong>: không quá vội để nước còn gắt, không quá lâu để vị trở nên đậm chát. Giống như cách ta sống, mọi thứ đều cần một nhịp điệu vừa phải.</p>

        <h2>Hương trà và bài học về sự lắng nghe</h2>
        <img src="/images/huong-tra-va-bai-hoc.png" class="article-image" />
        <p>Có những buổi sáng, một tách trà nóng giúp tâm trí sáng rõ; có những buổi chiều, vị trà nhẹ nhàng giúp ta thả trôi những mệt mỏi. Khi ta thật sự chú ý đến hương thơm của lá trà và hậu ngọt còn đọng lại, ta đang học cách lắng nghe những điều nhỏ bé.Khi có thể lắng nghe được một tách trà, ta cũng dễ dàng lắng nghe chính mình hơn. Thưởng trà bền bỉ nuôi dưỡng một trạng thái tĩnh lặng cần thiết giữa cuộc sống xô bồ.</p>
        

        <h2>Tìm thấy bình yên trong điều rất nhỏ</h2>
        <img src="/images/nhung-gia-tri-ma-tra.png" class="article-image" />
        <p>Không cần nghi lễ cầu kỳ; một góc nhỏ bên cửa sổ hay vài phút nghỉ giữa giờ làm việc cũng đủ để bắt đầu. Điều quan trọng nằm ở sự <strong>hiện diện trọn vẹn</strong> trong từng khoảnh khắc. Khi ta thực sự có mặt với tách trà trước mắt, ta cũng đang học cách có mặt với chính mình.</p>
        
        <p><strong>Những giá trị mà trà mang lại:</strong></p>
        <ul>
            <li>Sự tĩnh tại trong tâm hồn</li>
            <li>Khả năng lắng nghe bản thân</li>
            <li>Sự cân bằng giữa nhịp sống gấp gáp</li>
        </ul>

        <h2>Lời kết</h2>
        <img src="/images/loi-ket.png" class="article-image" />

        <p>Thưởng trà không thay đổi thế giới bên ngoài, nhưng đủ để điều chỉnh thế giới bên trong mỗi người. Một tách trà ấm, một hơi thở sâu - đôi khi chỉ vậy thôi cũng đủ để ta tìm lại sự cân bằng.</p>
    </main>

    <footer>
        <p>Bình yên không nằm ở nơi xa xôi, mà ở ngay trong khoảnh khắc ta nâng chén trà lên.</p>
    </footer>

</body>
</html>`,
  },
  {
    id: 3,
    category: "ĐỜI SỐNG",
    title: "Trà và những câu chuyện bất ngờ",
    date: "25 Tháng 10, 2024",
    author: "Linh Chi",
    excerpt:
      "Bạn có biết mỗi loại lá trà đều mang một câu chuyện riêng? Từ chè xanh thanh mát đến trà thảo mộc dịu dàng, mỗi tách trà mở ra một hành trình nhỏ.",
    image: matchaImg,
    slug: "tra-va-nhung-cau-chuyen-bat-ngo",
    content: `
      <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trà và những câu chuyện bất ngờ</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        header {
            text-align: center;
            padding-bottom: 30px;
            border-bottom: 2px solid #2e7d32;
        }
        h1 {
            color: #2e7d32;
            font-size: 2.2em;
            margin-bottom: 10px;
        }
        .slogan {
            font-style: italic;
            color: #666;
        }
        h2 {
            color: #1b5e20;
            border-left: 5px solid #2e7d32;
            padding-left: 15px;
            margin-top: 30px;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        ul {
            list-style-type: none;
            padding-left: 20px;
        }
        ul li::before {
            content: "•";
            margin-right: 10px;
        }
        .highlight-box {
            background-color: #e8f5e9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
            margin: 20px 0;
            font-style: italic;
        }
        .article-image {
            width: 100%;
            max-width: 800px;
            height: 420px;
            object-fit: cover;
            display: block;
            margin: 20px auto;
            border-radius: 8px;
        }
        footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-style: italic;
            text-align: center;
            color: #555;
        }
        strong {
            color: #2e7d32;
        }
    </style>
</head>
<body>


    <main>
        <p>Có những câu chuyện không bắt đầu bằng lời nói, mà bắt đầu bằng hương thơm. Khi một tách trà được rót ra, làn hơi ấm khẽ lan trong không gian, cũng là lúc một cánh cửa nhỏ mở ra – dẫn về một vùng đất, một mùa vụ, một ký ức nào đó rất xa mà cũng rất gần.</p>
        
        <p>Trong văn hoá Việt, trà không chỉ là thức uống. Trà hiện diện trong câu chuyện đầu năm, trong buổi gặp mặt thân tình, trong những chiều mưa lặng lẽ bên hiên nhà. Trà trở thành sợi dây nối giữa người với người – và giữa người với chính mình.</p>

        <h2>Chè xanh – Vị thanh của sự nguyên bản</h2>
        <img src="/images/doi-song-che-xanh.png" class="article-image" />
        <p>Chè xanh mang trong mình câu chuyện của sự mộc mạc. Lá trà được chế biến tối giản để giữ lại sắc xanh và vị chát dịu tự nhiên. Khi nhấp một ngụm chè xanh, ta cảm nhận rõ vị đầu hơi đậm, rồi dần dần chuyển sang hậu ngọt thanh nơi cuống họng – một hành trình ngắn nhưng đủ để nhắc ta về sự kiên nhẫn.</p>
        <p>Ấm chè xanh buổi sáng dạy ta rằng sự giản dị không hề đơn điệu; ngược lại, chính sự <strong>nguyên bản</strong> mới là điều giữ ta lại lâu nhất.</p>

        <h2>Trà ô long – Câu chuyện của chuyển hoá</h2>
        <img src="/images/tra-o-long.png" class="article-image" />
        <p>Khác với chè xanh, trà ô long là biểu tượng của sự biến chuyển. Lá trà được lên men một phần, tạo nên nhiều tầng hương vị đan xen – vừa tươi mới, vừa sâu lắng. Ô long giống như một hành trình trưởng thành: có những giá trị chỉ xuất hiện khi ta đủ kiên nhẫn để chờ đợi. Trong không gian tĩnh lặng, từng chén trà nhỏ khiến ta nhận ra rằng mọi thay đổi đều cần thời gian, và chính quá trình ấy mới tạo nên chiều sâu.</p>
      

        <h2>Trà thảo mộc – Sự dịu dàng của thiên nhiên</h2>
        <img src="/images/tra-thao-moc.png" class="article-image" />
        <p>Trà thảo mộc mang đến câu chuyện của sự chăm sóc và lắng nghe cơ thể. Từ hoa cúc, hoa nhài đến các loại lá và rễ cây, mỗi thành phần đều mang một sắc thái riêng, gợi cảm giác an yên và chữa lành.</p>

        <p><strong>Những nốt hương an yên từ thảo mộc:</strong></p>
        <ul>
            <li>Hương hoa nhài thanh khiết</li>
            <li>Vị hoa cúc ấm áp dịu lòng</li>
            <li>Sự tươi mát của các loại lá rừng</li>
        </ul>

        <h2>Khi trà trở thành một khoảng lặng</h2>
        <img src="/images/khi-tra-tro-thanh.png" class="article-image" />
        <p>Điều bất ngờ của trà không nằm ở sự cầu kỳ, mà ở cách nó khiến ta <strong>chậm lại</strong>. Trong nhịp sống hiện đại vội vã, một tách trà có thể trở thành điểm dừng nhỏ bé nhưng đủ sâu. Khi ta thực sự chú tâm vào làn khói mỏng và vị trà đang dần mở ra, tâm trí cũng lắng xuống theo.</p>
        <p>Trà không chỉ phản ánh vùng đất nơi nó sinh ra, mà còn phản chiếu trạng thái của người thưởng thức. Có lẽ vì vậy mà trà luôn mang trong mình những câu chuyện bất ngờ – những mạch ngầm lặng lẽ chảy qua từng khoảnh khắc.</p>

        <h2>Lời kết</h2>
        <img src="/images/loi-ket-3.png" class="article-image" />
        <p>Đằng sau mỗi tách trà là một khoảng lặng rất riêng mà ta tự dành cho mình. Khi nâng chén trà lên, ta không chỉ đang thưởng thức hương vị, mà còn đang bước vào một câu chuyện – câu chuyện của thiên nhiên, của văn hoá, và của chính lòng mình.</p>
    </main>

    <footer>
        <p>Giữa bao chuyển động của cuộc sống, ta vẫn có thể tìm thấy một nơi đủ yên để trở về.</p>
    </footer>

</body>
</html>`,
  },
];
