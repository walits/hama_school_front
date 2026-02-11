output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.website.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "Website URL"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "route53_name_servers" {
  description = "Route 53 name servers (GoDaddy에서 설정 필요)"
  value       = aws_route53_zone.main.name_servers
}

output "route53_zone_id" {
  description = "Route 53 hosted zone ID"
  value       = aws_route53_zone.main.zone_id
}
