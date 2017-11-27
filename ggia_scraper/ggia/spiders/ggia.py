import scrapy


class GGIASpider(scrapy.Spider):
    name = "ggia"
    start_urls = [
        'https://ggia.berkeley.edu/'
    ]

    def parse(self, response):
        count = 0

        for article in response.css('li.article'):
            count += 1

            categories = article.root.attrib['data-filter'].split()
            difficulty = article.css("span.article-difficulty::text").extract_first()
            rating = article.css("span.rating-value::text").extract_first()
            frequency = article.css("p::text").extract_first()[11:].strip().split("/")
            duration = article.css("p::text").extract()[1][11:].strip().split(" ")
            link = article.css('a::attr(href)').extract_first()
            title = article.css('div.article__content h4::text').extract_first()
            description = article.css('div.article__content p::text').extract_first()
            img = "https://ggia.berkeley.edu" + article.css('img::attr(src)').extract_first()

            item = {
                "id": count,
                "title": title,
                "description": description,
                "link": link,
                "img": img,
                "categories": categories,
                "duration": duration,
                "frequency": frequency,
                "difficulty": difficulty,
                "rating": rating
            }

            request = response.follow(link, callback=self.parse_instructions)

            request.meta['item'] = item

            yield request



    def parse_instructions(self, response):

        item = response.meta['item']
        
        item["tutorial"] = response.css('div.section--secondary').extract_first()

        tutorial = response.css('div.section--secondary').extract_first()

        yield item


