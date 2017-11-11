## Use build image
FROM microsoft/aspnetcore-build:2.0 AS build-env

## Set working directory
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./

# Restore dotnet dependancies
RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .

## Expose port
EXPOSE 80

ENTRYPOINT ["dotnet", "ra-api.dll"]