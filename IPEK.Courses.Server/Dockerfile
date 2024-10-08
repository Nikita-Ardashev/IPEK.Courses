#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["IPEK.Courses.Server/IPEK.Courses.Server.csproj", "IPEK.Courses.Server/"]
COPY ["ipek.courses.client/ipek.courses.client.esproj", "ipek.courses.client/"]
RUN dotnet restore "./IPEK.Courses.Server/IPEK.Courses.Server.csproj"
COPY . .
WORKDIR "/src/IPEK.Courses.Server"
RUN dotnet build "./IPEK.Courses.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./IPEK.Courses.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IPEK.Courses.Server.dll"]
