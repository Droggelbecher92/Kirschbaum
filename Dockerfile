FROM openjdk:16

MAINTAINER Thomas Kittlaus <thomaskittlaus@gmail.com>

ADD backend/target/lowani.jar lowani.jar

CMD ["sh", "-c", "java -Dserver.port=$PORT -Dspring.data.potgresql.url=$profile_datasource_url -jar /lowani.jar"]