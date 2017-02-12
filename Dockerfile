FROM kjbreil/arch-base
MAINTAINER kjbreil
RUN pacman -Syu --needed --noconfirm nodejs npm git base-devel postgresql-libs python2
VOLUME ["/app"]
WORKDIR /app/
RUN rm -fR /opt/build/pkg/*
CMD ["./rustBot.sh"]