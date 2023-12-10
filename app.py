from flask import Flask, render_template, request
import pickle
import pandas as pd
from gensim import corpora
from gensim.models.ldamodel import LdaModel
from gensim.utils import simple_preprocess
from nltk.corpus import stopwords
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
import nltk
import re
import string
import json

app = Flask(__name__)

# Fungsi untuk mendapatkan label topik berdasarkan nomor topik


def get_topic_label(topic_number):
    # labels = {
    #     0: "Keluhan terkait suatu daerah",
    #     1: "Keluhan terkait pariwisata",
    #     2: "Keluhan terkait pendidikan",
    #     3: "Keluhan terkait kesehatan",
    #     4: "Keluhan terkait pemerintahan",
    #     5: "Keluhan terkait kehidupan-sosial antar warga",
    #     6: "Keluhan terkait layanan-umum masyarakat",
    #     7: "Keluhan terkait kesejahteraan",
    #     8: "Keluhan terkait infrastruktur-it",
    #     9: "Keluhan terkait layanan-pribadi",
    #     10: "Keluhan terkait perpajakan"
    # }
    labels17 = {
        0: "layanan-komunikasi-daring",
        1: "politik",
        2: "pegawai-publik",
        3: "lalulintas dan transportasi",
        4: "apresiasi-harapan terhadap pemimpin",
        5: "menggunakan-bahasa-lokal bahasa Jawa (Timur)",
        6: "doa-harapan masyarakat",
        7: "sepak-bola",
        8: "hiburan-pariwisata",
        9: "pendidikan",
        10: "parkir-liar",
        11: "infrastruktur",
        12: "kesejahteraan-pribadi",
        13: "tempat-tinggal",
        14: "penuntutan-hak masyarakat",
        15: "usaha-ekonomi",
        16: "layanan-masyarakat"
    }
    return labels17.get(topic_number, "Topik tidak terdefinisi")


@app.route('/', methods=['GET', 'POST'])
def indexbaru():
    if request.method == 'POST':
        # Memproses file Excel yang diunggah oleh pengguna
        uploaded_file = request.files['excel_file']
        data_excel = pd.read_excel(uploaded_file)
        data_excel = data_excel.dropna()

        # Extract the filename
        filename = uploaded_file.filename

        # Memuat model LDA dari file Pickle
        with open('FIX_cluster_using_lda.pkl', 'rb') as file:
            lda_model = pickle.load(file)

        # Preprocessing Kalimat Baru
        indo_stopwords = set(stopwords.words('indonesian'))
        custom_stopwords = {'ngga', 'nggak', 'gak', 'yg', 'cak', 'sy', 'ae', 'ya', 'gk', 'nya', 'iki', 'jam', 'tanggal',
                            'kasih', 'sk', 'moga', 'aaamiiin', 'aamiiin', 'ab', 'yo', 'yok', 'yth', 'yuk', 'mohon', 'sdh',
                            'karo', 'gitu', 'nang', 'tp', 'sbgai', 'wes', 'wis', 'kyk', 'neng', 'lek', 'ham', 'ht', 'th',
                            'aja', 'seng', 'dadi'}
        indo_stopwords.update(custom_stopwords)

        def clean_text_round1(text):
            text = text.lower()
            text = re.sub('\[.*?\]', ' ', text)
            text = re.sub('\(.*?\)', ' ', text)
            text = re.sub('[%s]' % re.escape(string.punctuation), ' ', text)
            text = re.sub('\w*\d\w*', ' ', text)
            return text

        def clean_text_round2(text):
            text = re.sub('[‘’“”…♪♪]', '', text)
            text = re.sub('\n', ' ', text)
            text = re.sub('\xa0', ' ', text)
            return text

        def preprocess_text(text):
            text = clean_text_round1(text)
            text = clean_text_round2(text)

            words = nltk.word_tokenize(text)
            words = [word for word in words if word.lower()
                     not in indo_stopwords]
            stemmer = StemmerFactory().create_stemmer()
            words = [stemmer.stem(word) for word in words]
            cleaned_text = ' '.join(words)
            return cleaned_text

        # Inisialisasi dictionary untuk melacak jumlah masing-masing topik
        jumlah_topik = {i: 0 for i in range(lda_model.num_topics)}

        # Iterasi melalui setiap baris data Excel
        for index, row in data_excel.iterrows():
            # Mengambil teks dari kolom yang sesuai dalam setiap baris
            # Ganti 'text' dengan nama kolom teks Anda
            kalimat_baru = row['text']

            # Preprocess kalimat
            kalimat_preprocessed = preprocess_text(kalimat_baru)

            # Vektorisasi Kalimat Baru
            dictionary_lda = corpora.Dictionary(
                [simple_preprocess(kalimat_preprocessed)])
            kalimat_vec = dictionary_lda.doc2bow(
                simple_preprocess(kalimat_preprocessed))

            # Dapatkan Distribusi Topik untuk Kalimat Baru
            distribusi_topik = lda_model.get_document_topics(kalimat_vec)
            print(distribusi_topik)

            # Ambil topik dengan probabilitas tertinggi
            topik_tertinggi = max(distribusi_topik, key=lambda item: item[1])

            if topik_tertinggi[1] > 0.5:
                # Update jumlah topik
                jumlah_topik[topik_tertinggi[0]] += 1

        # Mengurutkan jumlah masing-masing topik dari yang terbanyak ke yang paling sedikit
        sorted_jumlah_topik = sorted(
            jumlah_topik.items(), key=lambda x: x[1], reverse=True)
        # print(sorted_jumlah_topik)

        # return render_template('result.html', sorted_jumlah_topik=sorted_jumlah_topik)
        labeled_sorted_jumlah_topik = [
            (get_topic_label(topic), count) for topic, count in sorted_jumlah_topik]
        # print(labeled_sorted_jumlah_topik)

        print(filename)
        return render_template('result.html', labeled_sorted_jumlah_topik=labeled_sorted_jumlah_topik, excel_name=filename)

        # json_labeled_sorted_jumlah_topik = json.dumps(labeled_sorted_jumlah_topik)
        # print(json_labeled_sorted_jumlah_topik)
        # return render_template('resultbaru.html', labeled_sorted_jumlah_topik=labeled_sorted_jumlah_topik, json_labeled_sorted_jumlah_topik=json_labeled_sorted_jumlah_topik)

    return render_template('index.html', insurance_cost=0)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
