FROM cirrusci/flutter:latest

WORKDIR /usr/src/app

COPY . .

RUN sudo chown -R cirrus:cirrus /usr/src/app

RUN flutter build apk

RUN ls ./build/app/outputs/apk/release/app-release.apk

CMD sudo mv ./build/app/outputs/apk/release/app-release.apk /home/cirrus/apk/client.apk