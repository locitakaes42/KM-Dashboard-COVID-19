import pandas as pd

class WordCloud:

    def __init__(self, topic_file, news_file):
        self.df_topic = pd.read_csv(topic_file).drop(columns=['Unnamed: 0'])
        self.df_news = pd.read_csv(news_file).drop(columns=['Unnamed: 0'])

    def pre_process(self, text):
        text = text.lower().strip()
        text = text.replace('_', ' ')
        return text

    def clear_newline(self, text):
        return text.replace('\n', '').split('|')[0]
    
    def generate(self):
        result = []
        self.df_topic['Word'] = self.df_topic['Word'].apply(self.pre_process)
        self.df_news['cleaned_text'] = self.df_news['cleaned_text'].apply(self.pre_process)
        #self.df_news['Title'] = self.df_news['Title'].apply(self.pre_process)
        self.df_news['date'] = self.df_news['date'].apply(self.clear_newline)
        
        for i in self.df_topic.index:
            links = []
            titles = []
            dates = []

            for j in self.df_news.index:
                if self.df_topic['Word'][i] in self.df_news['cleaned_text'][j]:
                    links.append(self.df_news['Title_URL'][j])
                    titles.append(self.df_news['Title'][j])
                    dates.append(self.df_news['date'][j])
            
            if len(links) > 0:
                tmp = {'word': self.df_topic['Word'][i], 'links': links, 'titles': titles, 'dates': dates, 'value': self.df_topic['P'][i]}
                result.append(tmp)

        return result
