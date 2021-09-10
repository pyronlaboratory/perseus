FROM python

RUN mkdir /service
COPY . /service
WORKDIR /service

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python", "app.py" ]