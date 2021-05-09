terraform {
  required_providers {
    aws = {
        source  = "hashicorp/aws"
        version = "~> 3.27"
      }
  }
  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

# setup the EC2 instance
resource "aws_instance" "posdesia_server" {
  ami           = "ami-0affd4508a5d2481b"
  instance_type = "t2.micro"

  tags = {
    Name = "PosdesiaApp"
  }
}

#setup the RDS Postgres DB
resource "aws_db_instance" "posdesia_db" {
  allocated_storage    = 100
  db_subnet_group_name = "posdesia_db_subnet_group"
  engine = "postgres"
  engine_version = "12.5-R1"
  identifier = "posdesia-db"
  instance_class = "db.t2.micro"
  password = var.postgres_pass
  skip_final_snapshot = true
  storage_encrypted = true
  username = var.postgres_user
}
