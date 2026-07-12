$repo = "C:\Users\tamvo\Downloads\rdm digital\visitarealdelmonte"

git -C $repo remote set-url origin "https://OsoPanda1:PAT_TOKEN@github.com/OsoPanda1/visitarealdelmonte.git"
git -C $repo push origin main
