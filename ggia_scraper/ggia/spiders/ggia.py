import scrapy


class GGIASpider(scrapy.Spider):
    name = "ggia"
    start_urls = [
        'https://ggia.berkeley.edu/'
    ]

    def parse(self, response):
        for article in response.css('li.article'):
            categories = article.root.attrib['data-filter'].split()
            difficulty = article.css("span.article-difficulty::text").extract_first()
            rating = article.css("span.rating-value::text").extract_first()
            frequency = article.css("p::text").extract_first()[11:].strip().split("/")
            duration = article.css("p::text").extract()[1][11:].strip().split(" ")
            link = article.css('a::attr(href)').extract_first()
            title = article.css('div.article__content h4::text').extract_first()
            description = article.css('div.article__content p::text').extract_first()


            yield {
                "title": title,
                "description": description,
                "link": link,
                "categories": categories,
                "duration": duration,
                "frequency": frequency,
                "diffculty": difficulty,
                "rating": rating
            }